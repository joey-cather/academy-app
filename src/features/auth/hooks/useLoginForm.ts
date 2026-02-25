import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { useLoginMutation } from '../api/useLoginMutation';

const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const { mutate } = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    mutate(values);
  };

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};

export default useLoginForm;
