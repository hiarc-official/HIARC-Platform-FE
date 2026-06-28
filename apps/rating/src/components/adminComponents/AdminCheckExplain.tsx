import { AdminExplain } from '../../util/AdminExplain';

export const AdminCheckExplain = ({ blockName }: { blockName: string }) => (
    <div className="flex flex-col gap-[29px] w-[500px] mb-[30px]">
      <div className="text-[17.5px] font-bold">{blockName}</div>
      <div className="text-[12px] font-bold">{AdminExplain[blockName]}</div>
    </div>
  );
