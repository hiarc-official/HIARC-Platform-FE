'use client';

import TierImg from '../util/TierImg';

const RankingEntity = ({
  ranking,
  handle,
  tier,
  event,
  today,
  total,
  memberId,
}: {
  ranking: number;
  handle: string;
  tier: number;
  event: boolean;
  today: number;
  total: number;
  memberId: number;
}) => {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
  };
  return (
    <div
      onClick={handleClick}
      className="flex h-10 w-full cursor-pointer items-center border-b border-[#5F6368] text-[14px] font-normal"
    >
      <div className="ml-8 w-[41.29px] max-[480px]:ml-[18px] max-[480px]:w-6">{ranking}</div>
      <div className="w-[180px] max-[480px]:w-[142px]">{handle}</div>
      <div className="w-[200px] max-[480px]:w-[118px]">
        <TierImg tier={tier} />
      </div>
      <div className="w-[77px] max-[480px]:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {event && <img src="/assets/eventImg.png" alt="" />}
      </div>
      <div className="w-[77px] max-[480px]:hidden">
        <div className="flex w-[53px] justify-center">{today < 0 ? 0 : today}</div>
      </div>
      <div className="flex w-[29px] justify-center">{total < 0 ? 0 : total}</div>
    </div>
  );
};

export default RankingEntity;
