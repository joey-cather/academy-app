import { useQuery } from '@tanstack/react-query';
import { User } from '../types/type';
import { ApiErrorResponse } from '@/src/shared/types/type';
import { apiGet } from '@/src/shared/lib/apiClient';

const getMe = async (): Promise<User | null> => {
  try {
    const response = await apiGet<User>('/me');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.cause === 401) {
        return null;
      }
    }

    throw error;
  }
};

export const useMeQuery = () => {
  return useQuery<User | null, ApiErrorResponse>({
    queryKey: ['me'],
    queryFn: getMe,
  });
};
