import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProfileSchema,
  type ProfileFormValues,
} from '../schemas/profile.schema';
import { useProfileMutation } from '../api/useProfileMutation';
import { useCallback, useEffect } from 'react';
import { useNotification } from '@/src/shared/providers/NotificationProvider';

const useProfileForm = (userId?: number) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync } = useProfileMutation();

  const { notify } = useNotification();

  const onSubmit = useCallback(
    async (values: ProfileFormValues) => {
      if (!userId) {
        notify({
          type: 'alert',
          message: '사용자 정보가 아직 준비되지 않았습니다.',
        });
        return;
      }

      try {
        const response = await mutateAsync({ ...values, id: userId });

        notify({
          type: 'alert',
          message: response.message || '',
          onConfirm: () => {
            form.setValue('password', '');
            form.setValue('confirmPassword', '');
          },
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
