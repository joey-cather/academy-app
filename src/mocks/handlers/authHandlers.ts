import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '@/src/features/auth/types/type';
import { ApiErrorResponse, ApiResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { users } from '../data/users';
import { decodeToken } from '../utils/util';

let mockRefreshToken = 'valid-refresh-token';

export const authHandlers = [
  // 로그인
  http.post<never, LoginRequest, ApiResponse<LoginResponse> | ApiErrorResponse>(
    '/api/login',
    async ({ request }) => {
      const { email, password } = await request.json();

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        return HttpResponse.json(
          { message: '이메일과 비밀번호를 다시 확인해주세요.' },
          { status: 404 }
        );
      }

      return HttpResponse.json(
        {
          data: {
            accessToken: 'valid-access-token-' + user.id,
            userId: user.id,
          },
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': `refreshToken=${mockRefreshToken}; Path=/; HttpOnly;`,
          },
        }
      );
    }
  ),

  // 로그아웃
  http.post<
    never,
    LogoutRequest,
    ApiResponse<LogoutResponse> | ApiErrorResponse
  >('/api/logout', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    const token = decodeToken(authHeader);

    if (!token) {
      return HttpResponse.json(
        { data: { success: false }, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      { data: { success: true } },
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=; Path=/; HttpOnly;`,
        },
      }
    );
  }),

  // 회원가입
  http.post<
    never,
    RegisterRequest,
    ApiResponse<RegisterResponse> | ApiErrorResponse
  >('/api/register', async ({ request }) => {
    const { name, email, password } = await request.json();

    const user = users.find((user) => user.email === email);

    if (user) {
      return HttpResponse.json(
        { message: '이미 존재하는 이메일입니다.' },
        { status: 401 }
      );
    }

    // 실제로는 저장 후 저장된 id
    const newUserId = users.length + 1;

    return HttpResponse.json(
      {
        data: {
          userId: newUserId,
          message: '회원가입을 축하합니다! 로그인 화면으로 이동합니다.',
        },
      },
      { status: 200 }
    );
  }),

  // 로그인 유저 정보 조회
  http.get<never, never, ApiResponse<User> | ApiErrorResponse>(
    '/api/me',
    ({ request }) => {
      const authHeader = request.headers.get('Authorization');

      const token = decodeToken(authHeader);

      if (!token) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const user = users.find((user) => user.id === token.userId);

      if (!user) {
        return HttpResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        data: user,
      });
    }
  ),
];
