import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  Course,
  CourseCategory,
  CourseWithInstructor,
  GetCoursesParams,
} from '../types/type';
import { ApiErrorResponse, PaginatedResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';
import { courseQueryKeys } from './coursesQueryKeys';

export const getMajorCourses = async (): Promise<CourseWithInstructor[]> => {
  const response = await apiGet<CourseWithInstructor[]>('/courses/major');
  return response.data;
};

export const useMajorCoursesQuery = () => {
  return useQuery<CourseWithInstructor[], ApiErrorResponse>({
    queryKey: ['courses', 'major'],
    queryFn: getMajorCourses,
  });
};

export const getPaginatedCourses = async (
  params: GetCoursesParams
): Promise<PaginatedResponse<Course>> => {
  const response = await apiGet<PaginatedResponse<Course>>('/courses', params);
  return response.data;
};

export const usePaginatedCoursesQuery = (params: {
  category?: CourseCategory;
  keyword?: string;
}) => {
  const newParams = { ...params, page: 1, pageSize: 20 };

  return useInfiniteQuery<PaginatedResponse<Course>, ApiErrorResponse>({
    queryKey: courseQueryKeys.list(newParams),
    queryFn: ({ pageParam = 1 }) =>
      getPaginatedCourses({ ...newParams, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    placeholderData: (previousData) => previousData,
    initialPageParam: 1,
  });
};
