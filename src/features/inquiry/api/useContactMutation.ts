'use client';

import { useMutation } from '@tanstack/react-query';
import { ContactRequest, ContactResponse } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';

const createInquiry = async (
  data: ContactRequest
): Promise<ContactResponse> => {
  const response = await apiPost<ContactResponse, ContactRequest>(
    '/contact',
    data
  );
  return response.data;
};

export const useContactMutation = () => {
  return useMutation<ContactResponse, ApiErrorResponse, ContactRequest>({
    mutationFn: createInquiry,
  });
};
