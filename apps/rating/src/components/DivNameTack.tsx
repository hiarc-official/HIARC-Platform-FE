'use client';

import { Label } from '@hiarc-platform/design-system';
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
}): React.ReactElement => {
  const handleClick = (): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${memberId}`;
  };

  const truncatedId = id.length > 7 ? `${id.slice(0, 8)}...` : id;

  return (
    <div
      onClick={handleClick}
      className="group grid h-11 cursor-pointer grid-cols-[20px_24px_1fr_auto] items-center gap-3 rounded-md border-b border-gray-100 px-1 transition-colors last:border-b-0 hover:bg-gray-50"
    >
      <Label size="sm" selectable={false} className="text-center text-gray-400">
        {rank}
      </Label>
      <TierImg tier={tier} />
      <Label
        size="sm"
        selectable={false}
        className="truncate transition-colors group-hover:font-medium group-hover:text-primary-300 group-hover:underline"
      >
        {truncatedId}
      </Label>
      <Label size="sm" weight="bold" selectable={false} className="text-right tabular-nums">
        {totalHiting < 0 ? 0 : totalHiting}
      </Label>
    </div>
  );
};

export default DivNameTack;
