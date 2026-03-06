import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ContactFormSchema,
  type ContactFormValues,
} from '../schemas/contact.schema';
import { useContactMutation } from '../api/useContactMutation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/src/shared/providers/NotificationProvider';

const useContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
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

export default useContactForm;
