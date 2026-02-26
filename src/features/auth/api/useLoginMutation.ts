'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginRequest, LoginResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';
import { useAuthStore } from '@/src/shared/hooks/useAuthStore';

const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/login', data);
  return response.data;
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      useAuthStore.getState().setAccessToken(data.accessToken);
      router.replace('/');
    },
  });
};
