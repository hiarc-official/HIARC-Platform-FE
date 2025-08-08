import { z } from 'zod';

export const UpdateScheduleRequestSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').optional(),
  description: z.string().optional(),
  startTime: z.string().min(1, '시작 시간을 입력해주세요').optional(),
  endTime: z.string().min(1, '종료 시간을 입력해주세요').optional(),
  location: z.string().optional(),
  type: z.enum(['STUDY', 'EVENT', 'MEETING', 'EXAM']).optional(),
  attendeeIds: z.array(z.string()).optional(),
});

export type UpdateScheduleRequest = z.infer<typeof UpdateScheduleRequestSchema>;