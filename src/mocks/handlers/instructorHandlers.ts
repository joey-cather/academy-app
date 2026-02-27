import { ApiErrorResponse, ApiResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';
import { instructors } from '../data/instructors';
import { Instructor } from '@/src/features/instructor/types/type';

export const instructorHandlers = [
  http.get<never, never, ApiResponse<Instructor[]> | ApiErrorResponse>(
    '/api/instructors',
    () => {
      return HttpResponse.json({ data: instructors }, { status: 200 });
    }
  ),
];
