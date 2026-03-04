import { useQuery } from '@tanstack/react-query';
import { DashboardEnrollment } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';

export const getDashboardData = async (): Promise<DashboardEnrollment[]> => {
  const response = await apiGet<DashboardEnrollment[]>('/dashboard');
  return response.data;
};

export const useDashboardQuery = (userId?: number) => {
  return useQuery<DashboardEnrollment[], ApiErrorResponse>({
    queryKey: ['dashboard', userId],
    queryFn: getDashboardData,
    enabled: !!userId,
  });
};
