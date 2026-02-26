import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('메일 형식이 올바르지 않아요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
