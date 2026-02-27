'use client';

import { useMutation } from '@tanstack/react-query';
import { RegisterRequest, RegisterResponse } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';

const createUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiPost<RegisterResponse, RegisterRequest>(
    '/register',
    data
  );
  return response.data;
};

export const useRegisterMutation = () => {
  return useMutation<RegisterResponse, ApiErrorResponse, RegisterRequest>({
    mutationFn: createUser,
  });
};
