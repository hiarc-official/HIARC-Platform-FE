import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface AnnouncementSummaryProps extends Record<string, unknown> {
  announcementId: number;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  title: string;
  createdAt: Date;
  studyId: number;
  studyName: string;
  lectureRound: number;
}

export class AnnouncementSummary extends BaseModel<AnnouncementSummaryProps> {
  static readonly schema = z.object({
    announcementId: z.number(),
    announcementType: z.enum(['STUDY', 'RATING', 'GENERAL', 'ETC', 'EXTERNAL']),
    title: z.string().min(1),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    studyId: z.number(),
    studyName: z.string().min(1),
    lectureRound: z.number(),
  });

  get announcementId(): number {
    return this.props.announcementId;
  }

  get announcementType(): 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' {
    return this.props.announcementType;
  }

  get title(): string {
    return this.props.title;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get studyId(): number {
    return this.props.studyId;
  }

  get studyName(): string {
    return this.props.studyName;
  }

  get lectureRound(): number {
    return this.props.lectureRound;
  }

  equals(other?: AnnouncementSummary): boolean {
    return Boolean(other) && this.props.announcementId === other?.props.announcementId;
  }

  compareTo(other: AnnouncementSummary): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}
