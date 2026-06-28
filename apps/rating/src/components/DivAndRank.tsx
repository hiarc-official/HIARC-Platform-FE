const DivAndRank = ({ divNum, rank }: { divNum: number; rank: number }) => (
    <div className="flex w-[62px] whitespace-nowrap rounded-[18px] bg-primary px-[14px] py-[6px] text-[12px] text-white">
      div{divNum}
      <div className="pl-[7px] pr-[9px]"> | </div>
      {rank}th
    </div>
  );

export default DivAndRank;
