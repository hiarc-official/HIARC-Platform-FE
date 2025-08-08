import { z } from 'zod';

export const CreateAwardRequestSchema = z.object({
  title: z.string().min(1, '수상명을 입력해주세요'),
  description: z.string().min(1, '수상 내용을 입력해주세요'),
  category: z.string().min(1, '카테고리를 입력해주세요'),
  organization: z.string().min(1, '주최기관을 입력해주세요'),
  awardDate: z.string().min(1, '수상 날짜를 입력해주세요'),
  rank: z.string().optional(),
  certificateUrl: z.string().url('유효한 URL을 입력해주세요').optional(),
  isPublic: z.boolean().default(true),
});

export type CreateAwardRequest = z.infer<typeof CreateAwardRequestSchema>;