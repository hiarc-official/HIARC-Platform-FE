import { z } from 'zod';
import { BaseModel } from '@/shared/base/base-model';

export interface NoticeProps extends Record<string, unknown> {
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

export class Notice extends BaseModel<NoticeProps> {
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

  equals(other?: Notice): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Notice): number {
    return other.props.createdAt.getTime() - this.props.createdAt.getTime();
  }
}