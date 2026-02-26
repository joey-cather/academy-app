import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/src/features/auth/types/type';
import { ErrorResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';

let mockRefreshToken = 'valid-refresh-token';

export const authHandlers = [
  // 로그인
  http.post<never, LoginRequest, LoginResponse | ErrorResponse>(
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
          accessToken: 'valid-access-token',
          userId: 1,
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
  http.post<never, LogoutRequest, LogoutResponse | ErrorResponse>(
    '/api/logout',
    ({ request }) => {
      const auth = request.headers.get('Authorization');

      if (auth !== 'Bearer valid-access-token') {
        return HttpResponse.json(
          { success: false, message: 'Unauthorized' },
          { status: 401 }
        );
      }

      return HttpResponse.json(
        { success: true },
        {
          status: 200,
          headers: {
            'Set-Cookie': `refreshToken=; Path=/; HttpOnly;`,
          },
        }
      );
    }
  ),

  // 회원가입
  http.post<never, RegisterRequest, RegisterResponse | ErrorResponse>(
    '/api/register',
    async ({ request }) => {
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
          userId: 1,
          message: '회원가입을 축하합니다! 로그인 화면으로 이동합니다.',
        },
        { status: 200 }
      );
    }
  ),
];
