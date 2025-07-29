import { CategoryChip, cn, Divider, Label } from '@hiarc-platform/ui';
import { KoreanLevel, Level, LevelIcon } from 'constants/level';
import Image from 'next/image';
import StudyGrayChip from './StudyGrayChip';

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

export default function StudyCard({
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
    <div
      className={cn(
        'flex w-full flex-col gap-2 rounded-lg border border-gray-200  px-5 py-5',
        'hover:bg-gray-50',
        'transition-colors duration-200'
      )}
    >
      <div className="flex gap-2">
        <StudyGrayChip type="schedule" title={time} />
        <StudyGrayChip type="delivery" title={delivery} />
      </div>
      <div className="flex items-center">
        <Image src={LevelIcon[studyLevel]} alt="" height={42} width={42} />
        <div className="ml-3 flex flex-col gap-1">
          <Label size="lg" weight="bold">
            [{KoreanLevel[studyLevel]}] {studyTitle}
          </Label>
          <div className="flex items-center gap-2 text-gray-700">
            <Label size="sm" weight="regular" className="text-gray-700">
              {hostName}
            </Label>
            <Divider variant="vertical" size="10px" />
            <Label size="sm" weight="regular" className="text-gray-700">
              {startDate}~{endDate}
            </Label>
          </div>
        </div>
        <CategoryChip category={state} className="ml-auto" />
      </div>
      <Label size="md" weight="regular" className="mt-1 line-clamp-2 overflow-hidden text-ellipsis">
        {studyDiscription}
      </Label>
    </div>
  );
}
