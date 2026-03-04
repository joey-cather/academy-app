import {
  DashboardEnrollment,
  DashboardUpdateUserRequest,
  DashboardUpdateUserResponse,
} from '@/src/features/dashboard/types/type';
import { ApiErrorResponse, ApiResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { enrollments } from '../data/enrollments';
import { courses } from '../data/courses';
import { decodeToken } from '../utils/util';

export const dashboardHandlers = [
  http.get<never, never, ApiResponse<DashboardEnrollment[]> | ApiErrorResponse>(
    '/api/dashboard',
    async ({ request }) => {
      const authHeader = request.headers.get('Authorization');

      const token = decodeToken(authHeader);

      if (!token) {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const userEnrollments = enrollments.filter(
        (e) => e.userId === token.userId
      );

      const enriched = userEnrollments.reduce<DashboardEnrollment[]>(
        (acc, e) => {
          const course = courses.find((c) => c.id === e.courseId);

          if (course) {
            acc.push({ ...e, course });
          }

          return acc;
        },
        []
      );

      return HttpResponse.json(
        {
          data: enriched,
        },
        { status: 200 }
      );
    }
  ),

  http.post<
    never,
    DashboardUpdateUserRequest,
    ApiResponse<DashboardUpdateUserResponse> | ApiErrorResponse
  >('/api/dashboard/update/user', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    const token = decodeToken(authHeader);

    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId, name, email, password } = await request.json();
    // 수정하는 로직

    return HttpResponse.json(
      {
        data: {
          userId: userId,
          message: '회원 정보가 수정되었습니다.',
        },
      },
      { status: 200 }
    );
  }),
];
