import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface AnnouncementSummaryProps {
  announcementId: number;
  announcementType: '하이팅' | '알고리즘' | '기타';
  title: string;
  author: string;
  createdAt: Date;
}

export class AnnouncementSummary extends BaseModel<AnnouncementSummaryProps> {
  static readonly schema = z.object({
    announcementId: z.number(),
    announcementType: z.enum(['하이팅', '알고리즘', '기타']),
    title: z.string().min(1),
    author: z.string().min(1),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  get announcementId(): number {
    return this.props.announcementId;
  }

  get announcementType(): '하이팅' | '알고리즘' | '기타' {
    return this.props.announcementType;
  }

  get title(): string {
    return this.props.title;
  }

  get author(): string {
    return this.props.author;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  equals(other?: AnnouncementSummary): boolean {
    return Boolean(other) && this.props.announcementId === other?.props.announcementId;
  }

  compareTo(other: AnnouncementSummary): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}
