import Image from 'next/image';
import { cn } from '../lib/utils';
import { CategoryChip } from './category-chip';
import { Divider } from './divider';
import { Label } from './label/label';

export default function StudyGrayChip({
  type,
  title,
}: {
  type: 'schedule' | 'delivery';
  title: string;
}): React.ReactElement {
  return (
    <div className="flex h-[25px] w-fit items-center gap-1 rounded-md bg-gray-100 px-3 text-md text-gray-700">
      <div>
        {type === 'schedule' ? (
          <Image src="/Schedule.svg" alt="" height={16} width={16} />
        ) : (
          <Image src="/People.svg" alt="" height={16} width={16} />
        )}
      </div>
      <div>{title}</div>
    </div>
  );
}

// 1. enum 제거, string literal union type 선언
type StudyLevel = 'basic' | 'intermediate' | 'expert';

// 2. 유틸 타입 수정
const LevelIcon: Record<StudyLevel, string> = {
  basic: '/Basic.svg',
  intermediate: '/Intermediate.svg',
  expert: '/Expert.svg',
};

const KoreanLevel: Record<StudyLevel, string> = {
  basic: '기초',
  intermediate: '초급',
  expert: '중급',
};

interface StudyCardProps {
  time: string;
  delivery: string;
  studyLevel: StudyLevel; // string literal!
  studyTitle: string;
  hostName: string;
  startDate: string;
  endDate: string;
  studyDescription: string;
  state: 'participating' | 'recruiting';
}

function MobileStudyCard({
  time,
  delivery,
  studyLevel,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDescription,
  state,
}: StudyCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 rounded-lg border border-gray-200 px-5 py-5',
        'hover:bg-gray-50',
        'transition-colors duration-200'
      )}
    >
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
        {studyDescription}
      </Label>
    </div>
  );
}

function DesktopStudyCard({
  time,
  delivery,
  studyLevel,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDescription,
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
        {studyDescription}
      </Label>
    </div>
  );
}

export function StudyCard({
  time,
  delivery,
  studyLevel,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDescription,
  state,
}: StudyCardProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="block md:hidden">
        <MobileStudyCard
          time={time}
          delivery={delivery}
          studyLevel={studyLevel}
          studyTitle={studyTitle}
          hostName={hostName}
          startDate={startDate}
          endDate={endDate}
          studyDescription={studyDescription}
          state={state}
        />
      </div>
      <div className="hidden md:block">
        <DesktopStudyCard
          time={time}
          delivery={delivery}
          studyLevel={studyLevel}
          studyTitle={studyTitle}
          hostName={hostName}
          startDate={startDate}
          endDate={endDate}
          studyDescription={studyDescription}
          state={state}
        />
      </div>
    </div>
  );
}
