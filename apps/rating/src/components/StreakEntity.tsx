'use client';

import InfoEntity from '../atoms/InfoEntity';
import CircularProgress from '../atoms/CircularProgress';
import Color from '../util/Color';
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
    <div className="w-[460px] flex flex-col cursor-pointer" onClick={handleClick}>
      <div className="flex w-full flex-col">
        <InfoEntity handle={handle} div={div} tier={tier} />
        <div className="w-[98%] border-b border-primary mt-[-1px] ml-3 max-[480px]:w-[92%]"></div>
      </div>
      <div className="mt-4 flex gap-[24.33px]">
        <div className="w-[63px] flex flex-col gap-[6px]">
          <div
            className="text-[10px] border-[0.5px] rounded-[12px] flex justify-center items-center px-2 flex-nowrap mb-[3px] h-5"
            style={{ borderColor: Color.graySub3 }}
          >
            이번 시즌
          </div>
          <CircularProgress value={seasonStreak} maxValue={seasonTotal} width={60} height={60} />
        </div>
        <div className="flex flex-col gap-[9px]">
          <div className="flex gap-1">
            <div
              className="text-[10px] border-[0.5px] rounded-[12px] flex justify-center items-center px-2 flex-nowrap mb-[3px] h-5"
              style={{ borderColor: Color.graySub3 }}
            >
              누적
            </div>
            {startDate && (
              <div
                className="text-[10px] border-[0.5px] rounded-[12px] flex justify-center items-center px-2 flex-nowrap mb-[3px] h-5"
                style={{ borderColor: Color.primary }}
              >
                {startDate} 부터
              </div>
            )}
          </div>
          <div className="flex gap-[22px]">
            <div className="mt-[13px] w-[73px] h-[35px] flex items-end text-[15px] font-black">
              <div className="text-[35px]">{totalStreak}</div>
              <div className="mb-1">일</div>
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
    </div>
  );
};

export default StreakEntity;
