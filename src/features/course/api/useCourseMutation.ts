'use client';

import { useMutation } from '@tanstack/react-query';
import {
  DashboardCreateEnrollmentRequest,
  DashboardCreateEnrollmentResponse,
} from '../../dashboard/types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';
import { queryClient } from '@/src/shared/api/queryClient';

const createEnrollment = async (
  data: DashboardCreateEnrollmentRequest
): Promise<DashboardCreateEnrollmentResponse> => {
  const response = await apiPost<
    DashboardCreateEnrollmentResponse,
    DashboardCreateEnrollmentRequest
  >('/courses/create/enrollment', data);
  return response.data;
};

export const useCreateEnrollmentMutation = () => {
  return useMutation<
    DashboardCreateEnrollmentResponse,
    ApiErrorResponse,
    DashboardCreateEnrollmentRequest
  >({
    mutationFn: createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
