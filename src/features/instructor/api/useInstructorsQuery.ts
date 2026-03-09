import { useQuery } from '@tanstack/react-query';
import { Instructor } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';

export const getMajorInstructors = async (): Promise<Instructor[]> => {
  const response = await apiGet<Instructor[]>('/instructors/major');
  return response.data;
};

export const useRecentInstructorsQuery = () => {
  return useQuery<Instructor[], ApiErrorResponse>({
    queryKey: ['instrutors', 'major'],
    queryFn: getMajorInstructors,
  });
};

export const getInstructors = async (): Promise<Instructor[]> => {
  const response = await apiGet<Instructor[]>('/instructors');
  return response.data;
};

export const useInstructorsQuery = () => {
  return useQuery<Instructor[], ApiErrorResponse>({
    queryKey: ['instructors'],
    queryFn: getInstructors,
  });
};
