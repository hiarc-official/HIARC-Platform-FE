import { StudyGroup } from '@hiarc-platform/shared';
import { StudyGroupListItem } from '@hiarc-platform/ui';

interface StudyGroupListProps {
  groupList: StudyGroup[];
  onEdit?(groupId: number, groupData: StudyGroup): void;
  onDelete?(groupId: number): void;
}

export function StudyGroupList({
  groupList,
  onEdit,
  onDelete,
}: StudyGroupListProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      {groupList.map((group) => (
        <StudyGroupListItem
          key={group.groupId}
          studyGroup={group}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
