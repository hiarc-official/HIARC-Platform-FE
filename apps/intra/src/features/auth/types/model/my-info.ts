import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface MyInfoProps {
  memberId: number;
  bojHandle: string;
  memberRole: string;
  adminRole: string;
}

export class MyInfo extends BaseModel<MyInfoProps> {
  static readonly schema = z.object({
    memberId: z.number().min(1),
    bojHandle: z.string().min(3).max(20),
    memberRole: z.string().min(3).max(20),
    adminRole: z.string().min(3).max(20),
  });
}
