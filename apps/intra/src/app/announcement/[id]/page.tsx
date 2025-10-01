import { PageLayout } from '@hiarc-platform/ui';
import {
  DesktopAnnouncementDetailPage,
  MobileAnnouncementDetailPage,
} from '@/features/announcement/pages/announcement-detail';
import { announcementApi } from '@/features/announcement/api/announcement';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const announcements = await announcementApi.GET_ANNOUNCEMENTS({
      page: 0,
      size: 100,
    });

    return announcements.content?.map((announcement) => ({
      id: announcement.announcementId?.toString() || '',
    })).filter(param => param.id) || [];
  } catch (error) {
    return [];
  }
}

export default async function AnnouncementDetail({
  params,
}: PageProps): Promise<React.ReactElement> {
  let announcement;

  try {
    announcement = await announcementApi.GET_ANNOUNCEMENT(params.id);
  } catch (error) {
    notFound();
  }

  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementDetailPage announcement={announcement} />}
      mobileChildren={<MobileAnnouncementDetailPage announcement={announcement} />}
    />
  );
}
