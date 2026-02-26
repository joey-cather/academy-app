import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
  email: z.string().email('메일 형식이 올바르지 않아요.'),
  subject: z
    .string()
    .min(5, { message: '제목은 최소 5글자 이상이어야 합니다.' })
    .max(100, { message: '제목은 최대 100글자까지 가능합니다.' }),
  message: z
    .string()
    .min(20, { message: '메시지는 최소 20글자 이상이어야 합니다.' })
    .max(2000, { message: '메시지는 최대 2000글자까지 가능합니다.' }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
