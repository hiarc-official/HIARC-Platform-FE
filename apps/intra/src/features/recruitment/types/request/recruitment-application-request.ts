import { z } from 'zod';

export const RecruitmentApplicationRequestSchema = z.object({
  applicantName: z.string().min(1, '이름을 입력해주세요'),
  applicantEmail: z.string().email('유효한 이메일을 입력해주세요'),
  bojHandle: z.string().optional(),
  motivation: z.string().min(10, '지원 동기를 10자 이상 입력해주세요'),
  experience: z.string().min(10, '개발 경험을 10자 이상 입력해주세요'),
});

export type RecruitmentApplicationRequest = z.infer<typeof RecruitmentApplicationRequestSchema>;