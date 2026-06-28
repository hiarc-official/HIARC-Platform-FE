import { Label } from '@hiarc-platform/design-system';

const DivAndRank = ({ divNum, rank }: { divNum: number; rank: number }) => (
  <Label
    size="xs"
    className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-gray-100 px-2 py-0.5 text-gray-700"
  >
    div{divNum}
    <span className="text-gray-300">|</span>
    {rank}th
  </Label>
);

export default DivAndRank;
