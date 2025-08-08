import { z } from 'zod';

export const CreateScheduleRequestSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().optional(),
  startTime: z.string().min(1, '시작 시간을 입력해주세요'),
  endTime: z.string().min(1, '종료 시간을 입력해주세요'),
  location: z.string().optional(),
  type: z.enum(['STUDY', 'EVENT', 'MEETING', 'EXAM']),
  studyId: z.string().optional(),
  attendeeIds: z.array(z.string()).optional(),
});

export type CreateScheduleRequest = z.infer<typeof CreateScheduleRequestSchema>;