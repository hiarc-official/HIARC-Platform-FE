import { StudyAnnouncementTable } from '@hiarc-platform/ui';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import { useDeleteStudyAnnouncement } from '../../hooks/study-instructor/mutation/use-delete-study-announcement';

interface StudyAnnouncementTabProps {
  studyId?: number;
  pageableModel?: PageableModel<AnnouncementSummary>;
  isInstructor?: boolean;
}

export function StudyAnnouncementTab({
  studyId,
  pageableModel,
  isInstructor = false,
}: StudyAnnouncementTabProps): React.ReactElement {
  const router = useRouter();
  const { mutate: deleteStudyAnnouncement } = useDeleteStudyAnnouncement();

  const handleEdit = useCallback(
    (announcement: AnnouncementSummary): void => {
      if (!announcement.announcementId) {
        console.error('공지사항 수정 실패: announcementId가 없습니다.');
        return;
      }

      const params = new URLSearchParams();
      if (studyId) {
        params.set('studyId', studyId.toString());
      }
      router.push(`/announcement/${announcement.announcementId}/edit?${params.toString()}`);
    },
    [router, studyId]
  );

  const handleDelete = useCallback(
    (announcementId: number): void => {
      deleteStudyAnnouncement({ studyId: studyId ?? 0, announcementId });
    },
    [deleteStudyAnnouncement, studyId]
  );

  const handleRowClick = useCallback(
    (announcement: AnnouncementSummary): void => {
      const id = announcement.announcementId;
      if (!id) {
        return;
      }
      router.push(`/announcement/${id}`);
    },
    [router]
  );

  return (
    <StudyAnnouncementTable
      isInstructor={isInstructor}
      pageableModel={pageableModel}
      onRowClick={handleRowClick}
      onEditClick={handleEdit}
      onDeleteClick={handleDelete}
    />
  );
}
