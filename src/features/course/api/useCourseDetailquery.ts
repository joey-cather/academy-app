import { useQuery } from '@tanstack/react-query';
import { Course, CurriculumItem, Review } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';

export const getCourse = async (courseId: string): Promise<Course> => {
  const response = await apiGet<Course>(`/courses/${courseId}`);
  return response.data;
};

export const useCourseQuery = (courseId: string) => {
  return useQuery<Course, ApiErrorResponse>({
    queryKey: ['course', courseId],
    queryFn: () => getCourse(courseId),
  });
};

export const getCurriculum = async (
  courseId: string
): Promise<CurriculumItem[]> => {
  const response = await apiGet<CurriculumItem[]>(
    `/courses/${courseId}/curriculum`
  );
  return response.data;
};

export const useCurriculumQuery = (courseId: string) => {
  return useQuery<CurriculumItem[], ApiErrorResponse>({
    queryKey: ['curriculum', courseId],
    queryFn: () => getCurriculum(courseId),
  });
};

export const getReviews = async (courseId: string): Promise<Review[]> => {
  const response = await apiGet<Review[]>(`/courses/${courseId}/reviews`);
  return response.data;
};

export const useReviewsQuery = (courseId: string) => {
  return useQuery<Review[], ApiErrorResponse>({
    queryKey: ['reviews', courseId],
    queryFn: () => getReviews(courseId),
  });
};
