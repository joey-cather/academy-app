import {
  ApiErrorResponse,
  ApiResponse,
  PaginatedResponse,
} from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { courses, curriculum, reviews } from '../data/courses';
import {
  Course,
  CurriculumItem,
  isCourseCategory,
  Review,
} from '@/src/features/course/types/type';

export const courseHandlers = [
  // 강좌 목록 조회
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

  // 강좌 조회
  http.get<never, never, ApiResponse<Course> | ApiErrorResponse>(
    '/api/courses/:courseId',
    ({ params }) => {
      const { courseId } = params;

      const course = courses.find((course) => course.id === Number(courseId));

      if (!course) {
        return HttpResponse.json(
          { message: 'Course not found' },
          { status: 404 }
        );
      }

      return HttpResponse.json(
        {
          data: course,
        },
        { status: 200 }
      );
    }
  ),

  // 커리큘럼 조회
  http.get<never, never, ApiResponse<CurriculumItem[]> | ApiErrorResponse>(
    '/api/courses/:courseId/curriculum',
    ({ params }) => {
      const { courseId } = params;

      const filtered = curriculum.filter(
        (curriculumItem) => curriculumItem.courseId === Number(courseId)
      );

      return HttpResponse.json(
        {
          data: filtered,
        },
        { status: 200 }
      );
    }
  ),

  // 수강 후기 조회
  http.get<never, never, ApiResponse<Review[]> | ApiErrorResponse>(
    '/api/courses/:courseId/reviews',
    ({ params }) => {
      const { courseId } = params;

      const filtered = reviews.filter(
        (review) => review.courseId === Number(courseId)
      );
      return HttpResponse.json(
        {
          data: filtered,
        },
        { status: 200 }
      );
    }
  ),
];
