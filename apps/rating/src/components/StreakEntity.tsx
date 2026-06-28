'use client';

import { Card, Label } from '@hiarc-platform/design-system';
import InfoEntity from '../atoms/InfoEntity';
import CircularProgress from '../atoms/CircularProgress';
import { NumberToStreakColor } from '../util/NumberToStreakColor';

const StreakEntity = ({
  seasonStreak,
  seasonTotal,
  totalStreak,
  tier,
  div,
  handle,
  startDate,
  memberId,
}: {
  seasonStreak: number;
  seasonTotal: number;
  totalStreak: number;
  tier: number;
  div: number;
  handle: string;
  startDate: string;
  memberId: number;
}) => {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
  };
  return (
    <Card
      className="flex w-full cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-none transition-colors hover:border-gray-300"
      onClick={handleClick}
    >
      <div className="flex w-full flex-col">
        <InfoEntity handle={handle} div={div} tier={tier} />
        <div className="ml-3 mt-[-1px] w-[98%] border-b border-gray-200"></div>
      </div>
      <div className="mt-4 flex gap-[24.33px]">
        <div className="flex w-[63px] flex-col gap-[6px]">
          <div className="mb-[3px] flex h-5 flex-nowrap items-center justify-center rounded-[12px] border border-gray-200 px-2">
            <Label size="xs" className="text-gray-600">
              이번 시즌
            </Label>
          </div>
          <CircularProgress value={seasonStreak} maxValue={seasonTotal} width={60} height={60} />
        </div>
        <div className="flex flex-col gap-[9px]">
          <div className="flex gap-1">
            <div className="mb-[3px] flex h-5 flex-nowrap items-center justify-center rounded-[12px] border border-gray-200 px-2">
              <Label size="xs" className="text-gray-600">
                누적
              </Label>
            </div>
            {startDate && (
              <div className="mb-[3px] flex h-5 flex-nowrap items-center justify-center rounded-[12px] border border-primary-300 px-2">
                <Label size="xs" className="text-primary-300">
                  {startDate} 부터
                </Label>
              </div>
            )}
          </div>
          <div className="flex gap-[22px]">
            <div className="mt-[13px] flex h-[35px] w-[73px] items-baseline">
              <span className="text-[35px] font-bold leading-none text-primary-300 tabular-nums">
                {totalStreak}
              </span>
              <span className="ml-1 text-sm text-gray-600">일</span>
            </div>
            <div className="grid grid-cols-[repeat(20,13px)] gap-px w-fit max-w-[273px] h-fit max-[480px]:grid-cols-[repeat(10,13px)] max-[480px]:max-w-[139px]">
              {Array.from({ length: totalStreak }, (_, i) => (
                <div
                  key={i}
                  className="w-[13px] h-[13px] rounded-[2px]"
                  style={{ backgroundColor: NumberToStreakColor(tier) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StreakEntity;
