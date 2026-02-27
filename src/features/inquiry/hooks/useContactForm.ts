import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactSchema,
  type ContactFormValues,
} from '../schemas/contact.schema';
import { useContactMutation } from '../api/useContactMutation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useNotification } from '@/src/shared/layouts/NotificationProvider';

const useContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
    mode: 'onSubmit',
  });

  const { mutateAsync } = useContactMutation();

  const router = useRouter();

  const { notify } = useNotification();

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      try {
        const response = await mutateAsync(values);

        notify({
          type: 'alert',
          message: response.message || '',
          onConfirm: () => {
            router.replace('/');
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

export default useContactForm;
