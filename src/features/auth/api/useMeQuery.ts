import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/lib/axios';
import axios, { AxiosError } from 'axios';
import { User } from '../types/type';

const meApi = async (): Promise<User | null> => {
  try {
    const response = await api.post('/me');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return null;
      }
    }

    throw error;
  }
};

export const useMeQuery = () => {
  return useQuery<User | null, AxiosError<User>>({
    queryKey: ['me'],
    queryFn: meApi,
  });
};
