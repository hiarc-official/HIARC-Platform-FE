import {
  AddGroupDialog,
  DialogUtil,
  EditGroupDialog,
  StudentList,
  StudyUnassignedGroup,
} from '@hiarc-platform/ui';
import { StudyGroupList } from '../../../../../../../packages/ui/src/components/study/study-group-list';
import { useCreateGroup } from '../../hooks/use-create-group';
import { useEditGroup } from '../../hooks/use-edit-group';
import { useValidateStudent } from '../../hooks/use-validate-student';
import { useWithdrawStudent } from '../../hooks/use-withdraw-student';
import { useStudyGroupList } from '../../hooks/use-study-group-list';
import { UpdateStatusDialog } from './dialog/UpdateStatusDialog';

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

  if (isGroupStudy) {
    return (
      <div className="flex flex-col gap-6">
        <StudyGroupList
          isAdmin={true}
          studyId={studyId}
          groupList={groupList?.studyGroups || []}
          onWithdraw={(studyId, memberId) => {
            withdrawStudent.mutate({ studyId, memberId });
          }}
          onDelete={(groupId) => {
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
          }}
          onChangeStatus={(studyId, memberId) => {
            DialogUtil.showComponent(<UpdateStatusDialog studyId={studyId} memberId={memberId} />);
          }}
          onEdit={(groupId, groupData) => {
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
          }}
        />
        <StudyUnassignedGroup
          isAdmin={true}
          studyId={studyId}
          members={groupList?.aloneStudents || []}
          onChangeStatus={(studyId, memberId) => {
            DialogUtil.showComponent(<UpdateStatusDialog studyId={studyId} memberId={memberId} />);
          }}
          onWithdraw={(studyId, memberId) => {
            withdrawStudent.mutate({ studyId, memberId });
          }}
          onAddGroup={() => {
            DialogUtil.showComponent(
              <AddGroupDialog
                onAddGroup={async (groupData) => {
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
          }}
        />
      </div>
    );
  }

  return (
    <StudentList
      isAdmin={true}
      studyId={studyId}
      onChangeStatus={(studyId, memberId) => {
        DialogUtil.showComponent(<UpdateStatusDialog studyId={studyId} memberId={memberId} />);
      }}
      onWithdraw={(studyId, memberId) => {
        withdrawStudent.mutate({ studyId, memberId });
      }}
      studentList={groupList?.aloneStudents || []}
    />
  );
}
