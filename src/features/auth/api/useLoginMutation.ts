'use client';

import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';

const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiPost<LoginResponse, LoginRequest>('/login', data);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, ApiErrorResponse, LoginRequest>({
    mutationFn: loginUser,
  });
};
