'use client';

import { useMutation } from '@tanstack/react-query';
import {
  DashboardUpdateUserRequest,
  DashboardUpdateUserResponse,
} from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';

const updateUser = async (
  data: DashboardUpdateUserRequest
): Promise<DashboardUpdateUserResponse> => {
  const response = await apiPost<
    DashboardUpdateUserResponse,
    DashboardUpdateUserRequest
  >('/dashboard/update/user', data);
  return response.data;
};

export const useProfileMutation = () => {
  return useMutation<
    DashboardUpdateUserResponse,
    ApiErrorResponse,
    DashboardUpdateUserRequest
  >({
    mutationFn: updateUser,
  });
};
