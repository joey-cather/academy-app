import { useQuery } from '@tanstack/react-query';
import { Course, GetCoursesParams } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';
import { courseQueryKeys } from './coursueQueryKeys';

export const getCourses = async (
  params: GetCoursesParams
): Promise<Course[]> => {
  const response = await apiGet<Course[]>('/courses', params);
  return response.data;
};

export const useCoursesQuery = (params: GetCoursesParams) => {
  return useQuery<Course[], ApiErrorResponse>({
    queryKey: courseQueryKeys.list(params),
    queryFn: () => getCourses(params),
  });
};
