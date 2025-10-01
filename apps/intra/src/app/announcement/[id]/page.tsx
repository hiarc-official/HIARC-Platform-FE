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
  let announcement = null;

  try {
    announcement = await announcementApi.GET_ANNOUNCEMENT(params.id);
  } catch (error: any) {
    // 404는 notFound 페이지로
    if (error?.response?.status === 404 || error?.status === 404) {
      notFound();
    }
    // 그 외 에러(403 권한 없음 등)는 클라이언트에서 처리
  }

  return (
    <PageLayout
      desktopChildren={<DesktopAnnouncementDetailPage announcement={announcement} id={params.id} />}
      mobileChildren={<MobileAnnouncementDetailPage announcement={announcement} id={params.id} />}
    />
  );
}
