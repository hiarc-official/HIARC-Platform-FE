import {
  AddGroupDialog,
  DialogUtil,
  EditGroupDialog,
  StudentList,
  StudyGroupList,
  StudyUnassignedGroup,
} from '@hiarc-platform/ui';

import { CreateGroupRequest, StudyGroup } from '@hiarc-platform/shared';
import { useCreateGroup } from '../../hooks/study-instructor/mutation/use-create-group';
import { useEditGroup } from '../../hooks/study-instructor/mutation/use-edit-group';
import { useValidateStudent } from '../../hooks/study-instructor/mutation/use-validate-student';
import { useWithdrawStudent } from '../../hooks/study-instructor/mutation/use-withdraw-student';
import { useStudyGroupList } from '../../hooks/study-instructor/query/use-study-group-list';

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
            console.error(error);
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
            console.error(error);
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
          onEdit={handleEditGroup}
        />
        <StudyUnassignedGroup
          isAdmin={true}
          studyId={studyId}
          members={groupList?.aloneStudents || []}
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
      onWithdraw={handleWithdrawStudent}
      studentList={groupList?.aloneStudents || []}
    />
  );
}
