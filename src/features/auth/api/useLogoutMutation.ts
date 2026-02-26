'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LogoutResponse } from '../types/type';
import { api } from '@/src/shared/lib/axios';
import { useAuthStore } from '@/src/shared/hooks/useAuthStore';

const logoutApi = async (): Promise<LogoutResponse> => {
  await api.post('/logout');
  return {};
};

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      useAuthStore.getState().setAccessToken(null);
      router.replace('/');
    },
  });
};
