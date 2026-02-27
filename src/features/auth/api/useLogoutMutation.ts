'use client';

import { useMutation } from '@tanstack/react-query';
import { LogoutResponse } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';

const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await apiPost<LogoutResponse, null>('/logout', null);
  return response.data;
};

export const useLogoutMutation = () => {
  return useMutation<LogoutResponse, ApiErrorResponse, void>({
    mutationFn: logoutUser,
  });
};
