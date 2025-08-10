import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface AnnouncementProps extends Record<string, unknown> {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  isImportant: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Announcement extends BaseModel<AnnouncementProps> {
  static readonly schema = z.object({
    id: z.uuid(),
    title: z.string().min(1),
    content: z.string(),
    authorId: z.uuid(),
    authorName: z.string().min(1),
    isImportant: z.boolean(),
    viewCount: z.number().int().min(0),
    createdAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
    updatedAt: z.preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    ),
  });

  equals(other?: Announcement): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Announcement): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}