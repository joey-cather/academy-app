'use client';

import { useMutation } from '@tanstack/react-query';
import { LogoutResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/src/shared/types/type';

const logoutApi = async (): Promise<LogoutResponse> => {
  const response = await api.post('/logout');
  return response.data;
};

export const useLogoutMutation = () => {
  return useMutation<LogoutResponse, AxiosError<ErrorResponse>, void>({
    mutationFn: logoutApi,
  });
};
