'use client';

import type { StudyMember } from '@hiarc-platform/shared';
import { Button } from '../button';
import { StudentListItem } from './student-list-item';
import { Title } from '../label/title';

interface StudyUnassignedGroupProps {
  members: StudyMember[];
  onAddGroup?(): void;
}

export function StudyUnassignedGroup({
  members,
  onAddGroup,
}: StudyUnassignedGroupProps): React.ReactElement {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <Title size="xs" weight="bold">
          (조없음)
        </Title>
        <Button className="bg-primary-200" variant="fill" size="xs" onClick={onAddGroup}>
          조 추가
        </Button>
      </div>

      {members.length > 0 && (
        <div className="mt-4 space-y-2">
          {members.map((member, index) => (
            <StudentListItem
              key={member.memberId || index}
              name={member.memberName || '이름 없음'}
              bojHandle={member.bojHandle || '핸들 없음'}
              attendanceCount={member.attendanceCount || 0}
              assignmentCount={member.assignmentCount || 0}
              totalRounds={member.totalRounds || 0}
              roundStatuses={member.roundStatuses || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
