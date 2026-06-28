import TierImg from '../util/TierImg';

const InfoEntity = ({ handle, div, tier }: { handle: string; div: number; tier: number }) => {
  const displayId = handle.length > 7 ? `${handle.slice(0, 8)}...` : handle;
  return (
    <div className="flex items-center w-fit max-w-[300px] min-w-[240px] h-[30px] border border-primary border-b-0 rounded-[15px] text-[14px]">
      <div className="max-w-[120px] ml-[22px]">{displayId}</div>
      <div className="ml-[22px] mr-[22px]">|</div>
      div {div}
      <div className="ml-[22px] mr-[22px]">|</div>
      <div className="mr-[22px] mt-[5px]">
        <TierImg tier={tier} />
      </div>
    </div>
  );
};

export default InfoEntity;
