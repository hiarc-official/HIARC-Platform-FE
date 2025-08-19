import { AnnnouncementType } from '@hiarc-platform/shared';

export interface AnnouncementQueryParams {
  page?: number;
  size?: number;
  semesterId?: number;
  title?: string;
  announcementType?: AnnnouncementType;
}
