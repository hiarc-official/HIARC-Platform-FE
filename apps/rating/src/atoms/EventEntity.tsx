'use client';
import TierImg from '../util/TierImg';

const EventEntity = ({
  rank,
  handle,
  tier = 31,
  eventHiting,
  memberId,
}: {
  rank: number;
  handle: string;
  tier: number;
  eventHiting: number;
  memberId: number;
}) => {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
  };

  // ID가 8글자보다 길면 8글자만 표시하고 "..." 추가
  const truncatedId = handle.length > 7 ? `${handle.slice(0, 8)}...` : handle;

  return (
    <div
      onClick={handleClick}
      className="pl-[5px] w-[226px] min-h-[40px] flex justify-between items-center text-[14px] font-normal cursor-pointer border-b border-primary max-[480px]:w-[284px]"
    >
      <div className="flex justify-between w-[147px]">
        <div className="w-[226px] flex mr-[60px]">
          <div className="w-[20px]">{rank}</div>
          <div className="w-[80px] text-ellipsis whitespace-nowrap overflow-hidden">{truncatedId}</div>
        </div>
        <TierImg tier={tier} />
      </div>
      {eventHiting}
    </div>
  );
};

export default EventEntity;
