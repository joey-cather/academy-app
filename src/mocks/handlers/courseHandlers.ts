import { ApiErrorResponse, ApiResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { courses } from '../data/courses';
import { Course, isCourseCategory } from '@/src/features/course/types/type';

export const courseHandlers = [
  // 강좌 조회
  http.get<never, never, ApiResponse<Course[]> | ApiErrorResponse>(
    '/api/courses',
    ({ request }) => {
      const { searchParams } = new URL(request.url);

      const category = searchParams.get('category');

      if (category && isCourseCategory(category)) {
        const filtered = courses.filter(
          (course) => course.category === category
        );

        return HttpResponse.json(
          {
            data: filtered,
          },
          { status: 200 }
        );
      }

      return HttpResponse.json(
        {
          data: courses,
        },
        { status: 200 }
      );
    }
  ),
];
