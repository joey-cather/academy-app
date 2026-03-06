import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, type LoginFormValues } from '../schemas/login.schema';
import { useLoginMutation } from '../api/useLoginMutation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/shared/hooks/useAuthStore';
import { queryClient } from '@/src/shared/api/queryClient';
import { useNotification } from '@/src/shared/providers/NotificationProvider';

const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync } = useLoginMutation();

  const router = useRouter();

  const { notify } = useNotification();

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        const response = await mutateAsync(values);
        useAuthStore.getState().setAccessToken(response.accessToken);
        queryClient.invalidateQueries({ queryKey: ['me'] });
        router.replace('/');
      } catch (error) {
        if (error instanceof Error) {
          notify({
            type: 'alert',
            message: error.message,
          });
        }
      }
    },
    [mutateAsync]
  );

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};

export default useLoginForm;
