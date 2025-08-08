import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface NoticeSummaryProps {
  id: string;
  announcementType: '하이팅' | '알고리즘' | '기타';
  title: string;
  author: string;
  createdAt: Date;
}

export class NoticeSummary extends BaseModel<NoticeSummaryProps> {
  static readonly schema = z.object({
    id: z.uuid(),
    announcementType: z.enum(['하이팅', '알고리즘', '기타']),
    title: z.string().min(1),
    author: z.string().min(1),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: NoticeSummary): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: NoticeSummary): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}
