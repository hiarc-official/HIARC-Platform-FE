import {
  AddGroupDialog,
  DialogUtil,
  EditGroupDialog,
  StudentList,
  StudyGroupList,
  StudyUnassignedGroup,
} from '@hiarc-platform/ui';

import { useValidateStudent } from '@/features/study/hooks';
import { UpdateStatusDialog } from './dialog/UpdateStatusDialog';
import { CreateGroupRequest, StudyGroup } from '@hiarc-platform/shared';
import { useCreateGroup } from '@/features/study/hooks';
import { useEditGroup } from '@/features/study/hooks';
import { useWithdrawStudent } from '@/features/study/hooks';
import { useStudyGroupList } from '@/features/study/hooks';

interface StudyMemberTabProps {
  studyId: number;
  isGroupStudy?: boolean;
}

export function StudyMemberTab({
  studyId,
  isGroupStudy = true,
}: StudyMemberTabProps): React.ReactElement {
  const { data: groupList } = useStudyGroupList(studyId);
  const validateStudent = useValidateStudent();
  const createGroup = useCreateGroup();
  const editGroup = useEditGroup();
  const withdrawStudent = useWithdrawStudent();

  const handleWithdrawStudent = (studyId: number, memberId: number): void => {
    withdrawStudent.mutate({ studyId, memberId });
  };

  const handleDeleteGroup = (groupId: number): void => {
    DialogUtil.showConfirm('조를 삭제하시겠습니까?', () => {
      editGroup.mutateAsync({
        studyId,
        groupId,
        groupData: {
          groupName: '',
          bojHandles: [],
        },
      });
    });
  };

  const handleChangeStatus = (studyId: number, memberId: number): void => {
    DialogUtil.showComponent(<UpdateStatusDialog studyId={studyId} memberId={memberId} />);
  };

  const handleEditGroup = (groupId: number, groupData: StudyGroup): void => {
    DialogUtil.showComponent(
      <EditGroupDialog
        initialData={groupData}
        onEditGroup={async (updatedGroupData) => {
          await editGroup.mutateAsync({
            studyId,
            groupId,
            groupData: updatedGroupData,
          });
        }}
        onValidateHandle={async (handle) => {
          try {
            await validateStudent.mutateAsync({ studyId, bojHandle: handle });
            return true;
          } catch (error) {
            return false;
          }
        }}
      />
    );
  };

  const handleAddGroup = (): void => {
    DialogUtil.showComponent(
      <AddGroupDialog
        onAddGroup={async (groupData: CreateGroupRequest) => {
          await createGroup.mutateAsync({ studyId, groupData });
        }}
        onValidateHandle={async (handle) => {
          try {
            await validateStudent.mutateAsync({ studyId, bojHandle: handle });
            return true;
          } catch (error) {
            return false;
          }
        }}
      />
    );
  };

  if (isGroupStudy) {
    return (
      <div className="flex flex-col gap-6">
        <StudyGroupList
          isAdmin={true}
          studyId={studyId}
          groupList={groupList?.studyGroups || []}
          onWithdraw={handleWithdrawStudent}
          onDelete={handleDeleteGroup}
          onChangeStatus={handleChangeStatus}
          onEdit={handleEditGroup}
        />
        <StudyUnassignedGroup
          isAdmin={true}
          studyId={studyId}
          members={groupList?.aloneStudents || []}
          onChangeStatus={handleChangeStatus}
          onWithdraw={handleWithdrawStudent}
          onAddGroup={handleAddGroup}
        />
      </div>
    );
  }

  return (
    <StudentList
      isAdmin={true}
      studyId={studyId}
      onChangeStatus={handleChangeStatus}
      onWithdraw={handleWithdrawStudent}
      studentList={groupList?.aloneStudents || []}
    />
  );
}
