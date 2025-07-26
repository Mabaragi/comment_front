import * as z from 'zod';

export const addSeriesSchema = z.object({
  seriesId: z
    .string()
    .min(1, '시리즈 ID를 입력하세요')
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    }, '올바른 시리즈 ID를 입력하세요'),
});

export type AddSeriesFormData = z.infer<typeof addSeriesSchema>;
