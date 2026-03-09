import {
  ApiErrorResponse,
  ApiResponse,
  PaginatedResponse,
} from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { courses, curriculum, reviews } from '../data/courses';
import {
  Course,
  CourseWithInstructor,
  CurriculumItem,
  isCourseCategory,
  Review,
} from '@/src/features/course/types/type';
import { instructors } from '../data/instructors';
import { decodeToken } from '../utils/util';
import { enrollments } from '../data/enrollments';
import {
  DashboardCreateEnrollmentRequest,
  DashboardCreateEnrollmentResponse,
  Enrollment,
} from '@/src/features/dashboard/types/type';

export const courseHandlers = [
  // 주요 강좌 목록 조회
  http.get<
    never,
    never,
    ApiResponse<CourseWithInstructor[]> | ApiErrorResponse
  >('/api/courses/major', () => {
    const shuffled = [...courses].sort(() => Math.random() - 0.5); // 배열 섞기
    const majorCourses = shuffled
      .slice(0, 3) // 앞에서 3개 가져오기
      .map((c) => {
        const instructor = instructors.find((i) => i.id === c.instructorId);
        if (!instructor) return null;

        return {
          ...c,
          instructor,
        };
      })
      .filter((item): item is CourseWithInstructor => item !== null);

    return HttpResponse.json({ data: majorCourses }, { status: 200 });
  }),

  // 강좌 목록 조회 (페이징)
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

    const rawKeyword = searchParams.get('keyword') ?? undefined;

    const filtered1 =
      rawCategory && isCourseCategory(rawCategory) && rawKeyword
        ? courses.filter((course) => {
            const matchCategory = course.category === rawCategory;
            const matchKeyword = course.title
              .toLowerCase()
              .includes(rawKeyword.toLowerCase());
            return matchCategory && matchKeyword;
          })
        : courses;
    const filtered = courses.filter((course) => {
      const matchCategory =
        rawCategory && isCourseCategory(rawCategory)
          ? course.category === rawCategory
          : true; // category 조건이 없으면 항상 true

      const matchKeyword = rawKeyword
        ? course.title.toLowerCase().includes(rawKeyword.toLowerCase())
        : true; // keyword 조건이 없으면 항상 true

      return matchCategory && matchKeyword;
    });

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

  http.post<
    never,
    DashboardCreateEnrollmentRequest,
    ApiResponse<DashboardCreateEnrollmentResponse> | ApiErrorResponse
  >('/api/courses/create/enrollment', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    const token = decodeToken(authHeader);

    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId, courseId } = await request.json();
    const exists = enrollments.some(
      (e) => e.userId === userId && e.courseId === courseId
    );

    if (exists) {
      return HttpResponse.json(
        { message: '이미 수강 중입니다.' },
        { status: 404 }
      );
    }

    const newEnrollmentId = enrollments.length + 1;
    const enrolledAt = new Date(Date.now());
    const formattedDate = enrolledAt.toISOString().split('T')[0];

    const newEnrollment: Enrollment = {
      id: newEnrollmentId,
      userId,
      courseId,
      progress: 0,
      status: 'active',
      enrolledAt: formattedDate,
    };
    enrollments.push(newEnrollment);

    return HttpResponse.json(
      {
        data: {
          enrollmentId: newEnrollmentId,
          message: '수강 신청이 완료되었습니다.',
        },
      },
      { status: 200 }
    );
  }),
];
