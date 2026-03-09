import { ApiErrorResponse, ApiResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { instructors } from '../data/instructors';
import { Instructor } from '@/src/features/instructor/types/type';

export const instructorHandlers = [
  // 주요 강사 목록 조회
  http.get<never, never, ApiResponse<Instructor[]> | ApiErrorResponse>(
    '/api/instructors/major',
    () => {
      const shuffled = [...instructors].sort(() => Math.random() - 0.5); // 배열 섞기
      const majorInstructors = shuffled.slice(0, 4); // 앞에서 3개 가져오기
      return HttpResponse.json({ data: majorInstructors }, { status: 200 });
    }
  ),

  http.get<never, never, ApiResponse<Instructor[]> | ApiErrorResponse>(
    '/api/instructors',
    () => {
      return HttpResponse.json({ data: instructors }, { status: 200 });
    }
  ),
];
