'use client';

import Color from '../util/Color';
import TierImg from '../util/TierImg';

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
    <div
      onClick={handleClick}
      className="w-[224px] h-[124px] bg-white flex cursor-pointer flex-col rounded-[16px] min-w-[224px] max-[480px]:w-[284px] max-[480px]:min-w-[284px]"
    >
      <div className="flex gap-2.5 pt-[11px] pr-0 pb-1 pl-[17px] border-b border-black [&_img]:w-[19px] [&_img]:h-[19px]">
        <TierImg tier={tier} />
        {handleDisplay}
        <div>|</div>
        <div>div {divNum}</div>
      </div>
      <div className="mt-[5px] ml-2.5 flex flex-col text-[12px] items-center">
        <div className="flex gap-1">
          <div
            className="text-[12px] border-[0.5px] rounded-[10px] flex justify-center items-center px-2 flex-nowrap mb-[3px] h-5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90px]"
            style={{ borderColor: Color.graySub3 }}
          >
            누적
          </div>
          {startDate && (
            <div
              className="text-[12px] border-[0.5px] rounded-[10px] flex justify-center items-center px-2 flex-nowrap mb-[3px] h-5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90px]"
              style={{ borderColor: Color.primary }}
            >
              {startDate} 부터
            </div>
          )}
        </div>
        <div className="flex flex-1 text-[15px] font-black items-end justify-center gap-0.5">
          <div className="text-[35px]">{totalStreak}</div>
          <div className="mb-[5px]">일</div>
        </div>
      </div>
    </div>
  );
};

export default IndividualBlock;
