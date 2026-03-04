import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProfileSchema,
  type ProfileFormValues,
} from '../schemas/profile.schema';
import { useProfileMutation } from '../api/useProfileMutation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/src/shared/layouts/NotificationProvider';

const useProfileForm = (userId: number) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync } = useProfileMutation();

  const router = useRouter();

  const { notify } = useNotification();

  const onSubmit = useCallback(
    async (values: ProfileFormValues) => {
      try {
        const response = await mutateAsync({ ...values, id: userId });

        notify({
          type: 'alert',
          message: response.message || '',
        });
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

export default useProfileForm;
