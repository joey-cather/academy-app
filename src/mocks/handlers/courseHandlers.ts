import {
  ApiErrorResponse,
  ApiResponse,
  PaginatedResponse,
} from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { courses } from '../data/courses';
import { Course, isCourseCategory } from '@/src/features/course/types/type';

export const courseHandlers = [
  // 강좌 조회
  http.get<
    never,
    never,
    ApiResponse<PaginatedResponse<Course>> | ApiErrorResponse
  >('/api/courses', ({ request }) => {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number(searchParams.get('page') ?? 1));
    const pageSize = Math.min(
      50,
      Math.max(1, Number(searchParams.get('pageSize') ?? 20))
    );
    const rawCategory = searchParams.get('category') ?? undefined;

    const filtered =
      rawCategory && isCourseCategory(rawCategory)
        ? courses.filter((course) => course.category === rawCategory)
        : courses;

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return HttpResponse.json(
      {
        data: {
          items,
          page,
          pageSize,
          total,
          totalPages,
        },
      },
      { status: 200 }
    );
  }),
];
