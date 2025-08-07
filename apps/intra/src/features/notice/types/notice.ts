import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface NoticeProps {
  id: string;
  title: string;
  description: string;
  announcementType: '하이팅' | '알고리즘' | '기타';
  author: string;
  createdAt: Date;
}

export class Notice extends BaseModel<NoticeProps> {
  static readonly schema = z.object({
    id: z.uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    announcementType: z.enum(['하이팅', '알고리즘', '기타']),
    author: z.string().min(1),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: Notice): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Notice): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}
