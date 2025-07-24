import StudyGrayChip from './StudyGrayChip';
import { Level, LevelIcon, KoreanLevel } from 'constants/level';
import Image from 'next/image';
import { CategoryChip } from '@hiarc-platform/ui';
import { Label } from '@hiarc-platform/ui';

interface StudyCardProps {
  time: string;
  delivery: string;
  studyLevel: Level;
  studyTitle: string;
  hostName: string;
  startDate: string;
  endDate: string;
  studyDiscription: string;
  state: 'participating' | 'recruiting';
}

export default function SmallStudyCard({
  time,
  delivery,
  studyLevel,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDiscription,
  state,
}: StudyCardProps): React.ReactElement {
  return (
    <div className="flex h-[173px] w-[335px] flex-col gap-2 rounded-lg border border-gray-200  px-5 py-5">
      <div className="flex gap-2">
        <StudyGrayChip type="schedule" title={time} />
        <StudyGrayChip type="delivery" title={delivery} />
      </div>
      <div className="flex items-center">
        <div className=" flex flex-col">
          <Label size="lg" weight="bold">
            [{KoreanLevel[studyLevel]}] {studyTitle}
          </Label>
          <Label size="sm" weight="regular" className="text-gray-700">
            {hostName} | {startDate}~{endDate}
          </Label>
        </div>
        <CategoryChip category={state} className="ml-auto h-[26px]" />
      </div>
      <Label size="md" weight="regular" className="mt-1 line-clamp-2 overflow-hidden text-ellipsis">
        {studyDiscription}
      </Label>
    </div>
  );
}
