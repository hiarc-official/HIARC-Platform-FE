'use client';

import TierImg from '../util/TierImg';
import { Card, Label } from '@hiarc-platform/design-system';

const IndividualBlock = ({
  tier,
  handle,
  divNum,
  totalStreak,
  startDate,
  memberId,
}: {
  tier: number;
  handle: string;
  divNum: number;
  totalStreak: number;
  startDate: string;
  memberId: number;
}): React.ReactElement => {
  const handleClick = (): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
  };
  const handleDisplay = handle.length > 8 ? `${handle.slice(0, 8)}...` : handle;

  return (
    <Card
      onClick={handleClick}
      className="group flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-none transition-colors hover:border-gray-300"
    >
      <div className="flex items-center gap-2">
        <TierImg tier={tier} />
        <Label
          size="sm"
          weight="bold"
          selectable={false}
          className="truncate transition-colors group-hover:text-primary-300 group-hover:underline"
        >
          {handleDisplay}
        </Label>
        <span className="ml-auto shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
          div {divNum}
        </span>
      </div>
      {startDate && (
        <Label size="xs" selectable={false} className="text-gray-500">
          {startDate} 부터
        </Label>
      )}
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[32px] font-bold leading-none text-primary-300 tabular-nums">
          {totalStreak}
        </span>
        <span className="text-sm text-gray-600">일 연속</span>
      </div>
    </Card>
  );
};

export default IndividualBlock;
