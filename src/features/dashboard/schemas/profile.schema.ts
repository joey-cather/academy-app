import z from 'zod';

export const ProfileSchema = z
  .object({
    name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.'),
    email: z.string().email('메일 형식이 올바르지 않아요.'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
