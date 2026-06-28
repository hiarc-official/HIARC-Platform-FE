import { Label } from '@hiarc-platform/design-system';
import TierImg from '../util/TierImg';

const InfoEntity = ({ handle, div, tier }: { handle: string; div: number; tier: number }): React.ReactElement => {
  const displayId = handle.length > 8 ? `${handle.slice(0, 8)}...` : handle;
  return (
    <div className="flex w-full items-center gap-2">
      <TierImg tier={tier} />
      <Label
        size="sm"
        weight="bold"
        selectable={false}
        className="truncate transition-colors group-hover:text-primary-300 group-hover:underline"
      >
        {displayId}
      </Label>
      <span className="ml-auto shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
        div {div}
      </span>
    </div>
  );
};

export default InfoEntity;
