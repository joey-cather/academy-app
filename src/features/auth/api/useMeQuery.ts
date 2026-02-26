import { useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/lib/axios';
import { AxiosError } from 'axios';
import { useAuthStore } from '../../../shared/hooks/useAuthStore';
import { User } from '../types/type';

const meApi = async (): Promise<User> => {
  const response = await api.post('/me');
  return response.data;
};

export const useMeQuery = () => {
  return useQuery<User, AxiosError<User>>({
    queryKey: ['me'],
    queryFn: meApi,
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 1번 재시도
    enabled: !!useAuthStore.getState().accessToken,
  });
};
