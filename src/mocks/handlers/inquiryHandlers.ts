import {
  ContactRequest,
  ContactResponse,
} from '@/src/features/inquiry/types/type';
import { ApiErrorResponse, ApiResponse } from '@/src/shared/types/type';
import { http, HttpResponse } from 'msw';

export const inquiryHandlers = [
  // 문의하기
  http.post<
    never,
    ContactRequest,
    ApiResponse<ContactResponse> | ApiErrorResponse
  >('/api/contact', async ({ request }) => {
    const { name, email, subject, message } = await request.json();

    return HttpResponse.json(
      {
        data: {
          message: '문의가 접수되었습니다.',
        },
      },
      { status: 200 }
    );
  }),
];
