import { Label } from '@hiarc-platform/design-system';
import TierImg from '../util/TierImg';

const InfoEntity = ({ handle, div, tier }: { handle: string; div: number; tier: number }) => {
  const displayId = handle.length > 7 ? `${handle.slice(0, 8)}...` : handle;
  return (
    <div className="flex items-center w-fit max-w-[300px] min-w-[240px] h-[30px] border border-gray-200 border-b-0 rounded-[15px]">
      <Label size="sm" className="max-w-[120px] ml-[22px]">
        {displayId}
      </Label>
      <Label size="sm" className="ml-[22px] mr-[22px]">
        |
      </Label>
      <Label size="sm">div {div}</Label>
      <Label size="sm" className="ml-[22px] mr-[22px]">
        |
      </Label>
      <div className="mr-[22px] mt-[5px]">
        <TierImg tier={tier} />
      </div>
    </div>
  );
};

export default InfoEntity;
