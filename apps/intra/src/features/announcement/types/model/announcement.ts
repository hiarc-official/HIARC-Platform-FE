import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

interface AnnouncementNavigationItem {
  announcementId: number;
  title: string;
  studyId: number;
  studyName: string;
  lectureRound: number;
}

export interface AnnouncementProps extends Record<string, unknown> {
  announcementId: number;
  title: string;
  place: string;
  scheduledAt: Date;
  content: string;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL';
  createdAt: Date;
  applicationUrl?: string;
  applicationStartAt?: string;
  applicationEndAt?: string;
  attachmentUrls: string[];
  imageUrls: string[];
  studyId?: number;
  studyName?: string;
  lectureRound?: number;
  prev?: AnnouncementNavigationItem;
  next?: AnnouncementNavigationItem;
}

export class Announcement extends BaseModel<AnnouncementProps> {
  static readonly schema = z.object({
    announcementId: z.number(),
    title: z.string().min(1),
    place: z.string(),
    scheduledAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    content: z.string(),
    announcementType: z.enum(['STUDY', 'RATING', 'GENERAL', 'ETC', 'EXTERNAL']),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    applicationUrl: z.string().optional(),
    applicationStartAt: z.string().optional(),
    applicationEndAt: z.string().optional(),
    attachmentUrls: z.array(z.string()).default([]),
    imageUrls: z.array(z.string()).default([]),
    studyId: z.number().optional(),
    studyName: z.string().optional(),
    lectureRound: z.number().optional(),
    prev: z.object({
      announcementId: z.number(),
      title: z.string(),
      studyId: z.number(),
      studyName: z.string(),
      lectureRound: z.number(),
    }).optional(),
    next: z.object({
      announcementId: z.number(),
      title: z.string(),
      studyId: z.number(),
      studyName: z.string(),
      lectureRound: z.number(),
    }).optional(),
  });

  get announcementId(): number {
    return this.props.announcementId;
  }

  get title(): string {
    return this.props.title;
  }

  get place(): string {
    return this.props.place;
  }

  get scheduledAt(): Date {
    return this.props.scheduledAt;
  }

  get content(): string {
    return this.props.content;
  }

  get announcementType(): 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' {
    return this.props.announcementType;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get applicationUrl(): string | undefined {
    return this.props.applicationUrl;
  }

  get applicationStartAt(): string | undefined {
    return this.props.applicationStartAt;
  }

  get applicationEndAt(): string | undefined {
    return this.props.applicationEndAt;
  }

  get attachmentUrls(): string[] {
    return this.props.attachmentUrls;
  }

  get imageUrls(): string[] {
    return this.props.imageUrls;
  }

  get studyId(): number | undefined {
    return this.props.studyId;
  }

  get studyName(): string | undefined {
    return this.props.studyName;
  }

  get lectureRound(): number | undefined {
    return this.props.lectureRound;
  }

  get prev(): AnnouncementNavigationItem | undefined {
    return this.props.prev;
  }

  get next(): AnnouncementNavigationItem | undefined {
    return this.props.next;
  }

  equals(other?: Announcement): boolean {
    return Boolean(other) && this.props.announcementId === other?.props.announcementId;
  }

  compareTo(other: Announcement): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}