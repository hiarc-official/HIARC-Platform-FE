import { Label } from '@hiarc-platform/design-system';
import { AdminExplain } from '../../util/AdminExplain';

export const AdminCheckExplain = ({ blockName }: { blockName: string }) => (
  <div className="flex w-full max-w-[500px] flex-col gap-3">
    <Label size="lg" weight="bold">
      {blockName}
    </Label>
    <Label size="xs" weight="bold" className="text-gray-600">
      {AdminExplain[blockName]}
    </Label>
  </div>
);
