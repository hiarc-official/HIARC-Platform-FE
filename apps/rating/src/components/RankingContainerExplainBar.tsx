const RankingContainerExplainBar = () => (
    <div className="flex h-10 w-full items-center border-b border-[#5F6368] text-[14px] font-normal text-[#5F6368]">
      <div className="ml-8 w-[41.29px] max-[480px]:ml-[18px] max-[480px]:w-6">#</div>
      <div className="w-[180px] max-[480px]:w-[142px]">handle</div>
      <div className="w-[200px] max-[480px]:w-[118px]">tier</div>
      <div className="w-[77px] max-[480px]:hidden">event</div>
      <div className="w-[77px] max-[480px]:hidden">today</div>
      <div>total</div>
    </div>
  );

export default RankingContainerExplainBar;
