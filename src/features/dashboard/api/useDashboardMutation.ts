'use client';

import { useMutation } from '@tanstack/react-query';
import {
  DashboardDeleteEnrollmentRequest,
  DashboardDeleteEnrollmentResponse,
} from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiPost } from '@/src/shared/lib/apiClient';

const deleteEnrollment = async (
  data: DashboardDeleteEnrollmentRequest
): Promise<DashboardDeleteEnrollmentResponse> => {
  const response = await apiPost<
    DashboardDeleteEnrollmentResponse,
    DashboardDeleteEnrollmentRequest
  >('/dashboard/delete/enrollment', data);
  return response.data;
};

export const useDashboardMutation = () => {
  return useMutation<
    DashboardDeleteEnrollmentResponse,
    ApiErrorResponse,
    DashboardDeleteEnrollmentRequest
  >({
    mutationFn: deleteEnrollment,
  });
};
