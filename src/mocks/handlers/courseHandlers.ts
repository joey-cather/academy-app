import {
  ApiErrorResponse,
  ApiResponse,
  PaginatedResponse,
} from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { courses } from '../data/courses';
import {
  Course,
  CourseDetail,
  isCourseCategory,
} from '@/src/features/course/types/type';

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

  // 강좌 상세 조회
  http.get<never, never, ApiResponse<CourseDetail> | ApiErrorResponse>(
    '/api/courses/:courseId/detail',
    ({ params }) => {
      const { courseId } = params;

      const course = courses.find((course) => course.id === Number(courseId));

      if (!course) {
        return HttpResponse.json(
          { message: 'Course not found' },
          { status: 404 }
        );
      }

      const courseDetail: CourseDetail = {
        ...course,
        curriculum: [
          {
            id: 1,
            title: 'Introduction to React',
            description: 'Learn about React basics.',
            duration: '1h',
          },
          {
            id: 2,
            title: 'React State Management',
            description: 'Learn how to manage state in React.',
            duration: '1h 30m',
          },
        ],
        reviews: [
          {
            id: 1,
            author: 'John Doe',
            rating: 5,
            content: 'Great course!',
            createdAt: '2023-01-10T00:00:00Z',
          },
          {
            id: 2,
            author: 'Jane Smith',
            rating: 4,
            content: 'Good course, but could use more examples.',
            createdAt: '2023-02-01T00:00:00Z',
          },
        ],
      };

      return HttpResponse.json(
        {
          data: courseDetail,
        },
        { status: 200 }
      );
    }
  ),
];
