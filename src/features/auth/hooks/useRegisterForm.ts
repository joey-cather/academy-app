import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormValues,
} from '../schemas/register.schema';
import { useRegisterMutation } from '../api/useRegisterMutation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useNotification } from '@/src/shared/layouts/NotificationProvider';

const useRegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync } = useRegisterMutation();

  const router = useRouter();

  const { notify } = useNotification();

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      try {
        const response = await mutateAsync(values);

        notify({
          type: 'alert',
          message: response.message || '',
          onConfirm: () => {
            router.replace('/login');
          },
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notify({
            type: 'alert',
            message: error.response?.data.message,
          });
        }
      }
    },
    [mutateAsync]
  );

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};

export default useRegisterForm;
