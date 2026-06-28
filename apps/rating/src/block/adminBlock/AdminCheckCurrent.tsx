import { AdminCheckExplain } from '../../components/adminComponents/AdminCheckExplain';
import { AdminInputBox } from '../../components/adminComponents/AdminInputBox';

export const AdminCheckCurrent = ({ blockName }: { blockName: string }) => (
    <div className="mt-[33px] flex gap-[150px]">
      <AdminCheckExplain blockName={blockName} />
      <AdminInputBox blockName={blockName} />
    </div>
  );
