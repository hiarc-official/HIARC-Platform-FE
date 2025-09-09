import { StudyGroup } from '@hiarc-platform/shared';
import { StudyGroupListItem } from './study-group-list-item';

interface StudyGroupListProps {
  groupList: StudyGroup[];
  studyId: number;
  onEdit?(groupId: number, groupData: StudyGroup): void;
  onDelete?(groupId: number): void;
  onWithdraw?(studyId: number, memberId: number): void;
}

export function StudyGroupList({
  groupList,
  studyId,
  onEdit,
  onDelete,
  onWithdraw,
}: StudyGroupListProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      {groupList.map((group) => (
        <StudyGroupListItem
          key={group.groupId}
          studyId={studyId}
          studyGroup={group}
          onEdit={onEdit}
          onDelete={onDelete}
          onWithdraw={onWithdraw}
        />
      ))}
    </div>
  );
}
