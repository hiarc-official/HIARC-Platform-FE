'use client';

import { cn } from '@hiarc-platform/design-system';
import TierImg from '../util/TierImg';

const DivNameTack = ({
  rank,
  id,
  tier = 31,
  totalHiting,
  memberId,
}: {
  rank: number;
  id: string;
  tier: number;
  totalHiting: number;
  memberId: number;
}) => {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
  };

  // ID가 8글자보다 길면 8글자만 표시하고 "..." 추가
  const truncatedId = id.length > 7 ? `${id.slice(0, 8)}...` : id;

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex min-h-[40px] w-[280px] cursor-pointer items-center justify-between pl-[5px] text-[14px] font-normal',
        rank !== 5 && 'border-b border-primary'
      )}
    >
      <div className="flex w-[147px] justify-between">
        <div className="mr-[60px] flex w-full gap-4">
          <div className="w-5">{rank}</div>
          <div className="w-20 overflow-hidden text-ellipsis whitespace-nowrap">{truncatedId}</div>
        </div>
        <TierImg tier={tier} />
      </div>
      {totalHiting < 0 ? 0 : totalHiting}
    </div>
  );
};

export default DivNameTack;
