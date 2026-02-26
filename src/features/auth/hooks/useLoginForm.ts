import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { useLoginMutation } from '../api/useLoginMutation';
import { useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/shared/hooks/useAuthStore';

const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync } = useLoginMutation();

  const router = useRouter();

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        const response = await mutateAsync(values);
        useAuthStore.getState().setAccessToken(response.accessToken);
        router.replace('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    },
    [mutateAsync]
  );

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};

export default useLoginForm;
