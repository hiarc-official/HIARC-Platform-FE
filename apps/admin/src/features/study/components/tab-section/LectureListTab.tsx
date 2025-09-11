import { DialogUtil, LectureList } from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';
import { useDeleteLecture } from '../../hooks';

import { CreateAttendanceCodeDialogWrapper } from './dialog/CreateAttendanceCodeDialogWrapper';
import { useRouter } from 'next/navigation';
import { ShowAttendanceCodeDialogWrapper } from './dialog/show-attendance-code-dialog-wrapper';
import { CreateAssignmentDialogWrapper } from './dialog/CreateAssignmentDialogWrapper';

interface LectureListTabProps {
  studyId?: number;
  lectureList?: Lecture[];
  className?: string;
  studyName?: string;
  semesterId?: number;
}

export function LectureListTab({
  className,
  lectureList,
  studyId,
  studyName,
  semesterId,
}: LectureListTabProps): React.ReactElement {
  const router = useRouter();
  const { mutate: deleteLecture } = useDeleteLecture();

  const handleTitleClick = (lecture: Lecture): void => {
    if (!lecture.announcementId) {
      console.error('강의 상세보기 실패: announcementId가 없습니다.');
      return;
    }
    router.push(`/announcement/${lecture.announcementId}`);
  };

  const handleCreateAttendanceClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <CreateAttendanceCodeDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        studyName={studyName}
        round={lecture.round ?? 0}
        lectureName={lecture.title ?? ''}
      />
    );
  };

  const handleShowAttendanceClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <ShowAttendanceCodeDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        studyName={studyName}
        round={lecture.round ?? 0}
        lectureName={lecture.title ?? ''}
      />
    );
  };

  const handleCreateAssignmentClick = (lecture: Lecture, onSuccess?: () => void): void => {
    DialogUtil.showComponent(
      <CreateAssignmentDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        isUpdate={false}
        onSuccess={onSuccess}
      />
    );
  };

  const handleShowAssignmentClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <CreateAssignmentDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        isUpdate={true}
      />
    );
  };

  const handleEditClick = (lecture: Lecture): void => {
    if (!lecture.announcementId) {
      console.error('강의 수정 실패: announcementId가 없습니다.');
      return;
    }

    const params = new URLSearchParams();
    if (studyId) {
      params.set('studyId', studyId.toString());
    }
    if (semesterId) {
      params.set('semesterId', semesterId.toString());
    }
    params.set('isLecture', 'true');

    router.push(`/announcement/${lecture.announcementId}/edit?${params.toString()}`);
  };

  const handleDeleteClick = (lecture: Lecture): void => {
    if (!lecture.announcementId) {
      console.error('강의 삭제 실패: announcementId가 없습니다.');
      return;
    }

    DialogUtil.showConfirm('정말로 삭제하시겠습니까?', () => {
      deleteLecture({
        studyId: studyId ?? 0,
        announcementId: lecture.announcementId!,
      });
    });
  };

  return (
    <LectureList
      isAdmin
      className={className}
      lectureList={lectureList}
      studyId={studyId}
      studyName={studyName}
      semesterId={semesterId}
      onTitleClick={handleTitleClick}
      onCreateAttendanceClick={handleCreateAttendanceClick}
      onShowAttendanceClick={handleShowAttendanceClick}
      onCreateAssignmentClick={handleCreateAssignmentClick}
      onShowAssignmentClick={handleShowAssignmentClick}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
    />
  );
}
