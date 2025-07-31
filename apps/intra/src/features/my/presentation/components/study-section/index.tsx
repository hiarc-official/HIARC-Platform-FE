import { cn, Label, LabeledSelector, Tabs } from '@hiarc-platform/ui';
import { AttendanceTable } from '@hiarc-platform/ui/src/components/table/attendance-table';
import { useState } from 'react';

interface StudySectionProps {
  attendance: boolean[];
  assignment: boolean[];
  className?: string; // 추가: 클래스 이름을 받을 수 있도록
}

export function StudySection({
  attendance,
  assignment,
  className,
}: StudySectionProps): React.ReactElement {
  const tabItems = [
    { label: '이번 학기 스터디', value: 'study' },
    { label: '이전 스터디', value: 'study_history' },
  ];
  const [tab, setTab] = useState('study');

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} />
      <LabeledSelector
        placeholder={'스터디를 선택해주세요.'}
        label={''}
        options={[
          { label: '스터디 1', value: 'study_1' },
          { label: '스터디 2', value: 'study_2' },
          { label: '스터디 3', value: 'study_3' },
        ]}
        className="mt-6 max-w-[390px]"
      />
      <Label size="lg" weight="bold" className="mt-6">
        상세 현황
      </Label>
      <AttendanceTable className="mb-20 mt-4" attendance={attendance} assignment={assignment} />
    </div>
  );
}
