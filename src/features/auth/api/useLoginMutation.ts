'use client';

import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/src/shared/types/type';

const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/login', data);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginRequest>({
    mutationFn: loginApi,
  });
};
