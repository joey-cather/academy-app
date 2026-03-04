import { DashboardEnrollment } from '@/src/features/dashboard/types/type';
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
];
