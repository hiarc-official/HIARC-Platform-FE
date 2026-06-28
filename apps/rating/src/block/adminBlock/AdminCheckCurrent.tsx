import { AdminCheckExplain } from '../../components/adminComponents/AdminCheckExplain';
import { AdminInputBox } from '../../components/adminComponents/AdminInputBox';

export const AdminCheckCurrent = ({ blockName }: { blockName: string }) => (
  <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
    <AdminCheckExplain blockName={blockName} />
    <AdminInputBox blockName={blockName} />
  </div>
);
