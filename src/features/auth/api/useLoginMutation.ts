'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginRequest, LoginResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';

const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);

      router.replace('/');
    },
  });
};
