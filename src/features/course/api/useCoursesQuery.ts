import { useInfiniteQuery } from '@tanstack/react-query';
import { Course, CourseCategory, GetCoursesParams } from '../types/type';
import { ApiErrorResponse, PaginatedResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';
import { courseQueryKeys } from './coursesQueryKeys';

export const getCourses = async (
  params: GetCoursesParams
): Promise<PaginatedResponse<Course>> => {
  const response = await apiGet<PaginatedResponse<Course>>('/courses', params);
  return response.data;
};
export const useCoursesQuery = (params: { category?: CourseCategory }) => {
  const newParams = { ...params, page: 1, pageSize: 20 };

  return useInfiniteQuery<PaginatedResponse<Course>, ApiErrorResponse>({
    queryKey: courseQueryKeys.list(newParams),
    queryFn: ({ pageParam = 1 }) =>
      getCourses({ ...newParams, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    placeholderData: (previousData) => previousData,
    initialPageParam: 1,
  });
};
