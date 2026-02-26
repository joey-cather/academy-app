import { http, HttpResponse } from 'msw';

let mockRefreshToken = 'valid-refresh-token';

export const handlers = [
  // 로그인
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email !== 'test@test.com' || password !== '123123123') {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        accessToken: 'valid-access-token',
        user: { id: 1, email },
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=${mockRefreshToken}; Path=/; HttpOnly;`,
        },
      }
    );
  }),

  // 로그아웃
  http.post('/api/logout', ({ request }) => {
    const auth = request.headers.get('Authorization');

    if (auth !== 'Bearer valid-access-token') {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(
      {},
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=; Path=/; HttpOnly;`,
        },
      }
    );
  }),
];
