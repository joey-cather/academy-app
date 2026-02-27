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

let mockRefreshToken = 'valid-refresh-token';

export const authHandlers = [
  // 로그인
  http.post<never, LoginRequest, ApiResponse<LoginResponse> | ApiErrorResponse>(
    '/api/login',
    async ({ request }) => {
      const { email, password } = await request.json();

      if (email !== 'test1@test.com' || password !== '123123123') {
        return HttpResponse.json(
          { message: '이메일과 비밀번호를 다시 확인해주세요.' },
          { status: 401 }
        );
      }

      return HttpResponse.json(
        {
          data: {
            accessToken: 'valid-access-token',
            userId: 1,
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
    const auth = request.headers.get('Authorization');

    if (auth !== 'Bearer valid-access-token') {
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

    // 이미 존재하는 이메일 예시
    if (email === 'test1@test.com') {
      return HttpResponse.json(
        { message: '이미 존재하는 이메일입니다.' },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        data: {
          userId: 1,
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
      const auth = request.headers.get('Authorization');

      if (auth !== 'Bearer valid-access-token') {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json({
        data: {
          id: 1,
          name: '홍길동',
          email: 'test1@test.com',
          password: '123123123',
          role: 'student',
          createdAt: '2026-02-20T10:15:30.000Z',
          updatedAt: '2026-02-22T14:40:10.000Z',
        },
      });
    }
  ),
];
