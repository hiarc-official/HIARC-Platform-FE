'use client';

import { PageLayout } from '@hiarc-platform/ui';
import {
  DesktopAnnouncementDetailPage,
  MobileAnnouncementDetailPage,
} from '@/features/announcement/pages/announcement-detail';

export default function AnnouncementDetail(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementDetailPage />}
      mobileChildren={<MobileAnnouncementDetailPage />}
    />
  );
}
