'use client';

import { useState } from 'react';
import type { StudyGroup } from '@hiarc-platform/shared';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Label } from '../label/label';
import { SlideFade } from '../animation/slide-fade';
import { StudentListItem } from './student-list-item';

interface StudyGroupListItemProps {
  studyGroup: StudyGroup;
  onEdit?(groupId: number): void;
}

export function StudyGroupListItem({
  studyGroup,
  onEdit,
}: StudyGroupListItemProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleEdit = (): void => {
    if (studyGroup.groupId && onEdit) {
      onEdit(studyGroup.groupId);
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 px-5 py-4 transition">
      <div className="flex items-center gap-4">
        <Label size="lg" weight="medium">
          {studyGroup.groupName || '조명 없음'}
        </Label>
        <IconButton
          size="lg"
          iconSrc={open ? '/shared-assets/CaretUp.svg' : '/shared-assets/CaretDown.svg'}
          aria-label="토글 상세"
          onClick={() => setOpen((toggle) => !toggle)}
        />
        <Button variant="secondary" size="xs" onClick={handleEdit}>
          수정
        </Button>
      </div>

      {open && studyGroup.students && studyGroup.students.length > 0 && (
        <SlideFade key="students" className="w-full">
          <div className="mt-4 space-y-2">
            {studyGroup.students.map((student, index) => (
              <StudentListItem
                key={student.memberId || index}
                name={student.memberName || '이름 없음'}
                attendanceCount={student.attendanceCount || 0}
                assignmentCount={student.assignmentCount || 0}
                totalRounds={student.totalRounds || 0}
                roundStatuses={student.roundStatuses || []}
              />
            ))}
          </div>
        </SlideFade>
      )}
    </div>
  );
}
