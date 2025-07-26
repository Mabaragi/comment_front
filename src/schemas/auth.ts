import z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, '사용자 이름을 입력하세요'),
  password: z
    .string()
    .min(4, '비밀번호는 최소 4자 이상이어야 합니다')
    .max(20, '비밀번호는 최대 20자까지 입력할 수 있습니다'),
});
export type LoginFormData = z.infer<typeof loginSchema>;
