'use client';

import { PageLayout } from '@hiarc-platform/ui';
import {
  DesktopAnnouncementListPage,
  MobileAnnouncementListPage,
} from '@/features/announcement/pages/announcement-list';

export default function AnnouncementList(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementListPage />}
      mobileChildren={<MobileAnnouncementListPage />}
    />
  );
}
