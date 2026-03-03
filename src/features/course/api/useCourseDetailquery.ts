import { useQuery } from '@tanstack/react-query';
import { CourseDetail } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';

export const getCourseDetail = async (
  courseId: string
): Promise<CourseDetail> => {
  const response = await apiGet<CourseDetail>(`/courses/${courseId}/detail`);
  return response.data;
};

export const useCourseDetailQuery = (courseId: string) => {
  return useQuery<CourseDetail, ApiErrorResponse>({
    queryKey: ['courseDetail', courseId],
    queryFn: () => getCourseDetail(courseId),
  });
};
