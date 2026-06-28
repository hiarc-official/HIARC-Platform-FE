const SearchedHitingEntity = ({
  totalHiting,
  seasonHiting,
  dailyHiting,
}: {
  totalHiting: number;
  seasonHiting: number;
  dailyHiting: number;
}) => (
    <div className="flex h-[166px] w-[479px] flex-col gap-px max-[480px]:w-[343px]">
      <div className="w-[38px] rounded-[18px] border border-primary px-[14px] py-[6px] text-[12px] font-bold text-primary">
        Hiting
      </div>
      <div className="flex min-h-[166px] w-full items-center gap-10 rounded-[15px] border border-primary max-[480px]:gap-[15px]">
        <div className="ml-[55px] flex h-[91px] w-[102px] flex-col items-center gap-[25px] max-[480px]:ml-3">
          <div className="inline-block w-fit whitespace-nowrap rounded-[10px] border border-[#5F6368] px-2 py-[3.5px]">
            누적
          </div>
          <div className="flex justify-center text-[35px] font-extrabold">
            {totalHiting < 0 ? 0 : totalHiting}
          </div>
        </div>
        <div className="flex h-[91px] flex-col items-center gap-[25px]">
          <div className="inline-block w-fit whitespace-nowrap rounded-[10px] border border-[#5F6368] px-2 py-[3.5px]">
            이번 시즌
          </div>
          <div className="flex justify-center text-[35px] font-extrabold">
            {seasonHiting < 0 ? 0 : seasonHiting}
          </div>
        </div>
        <div className="ml-5 flex h-[91px] w-[85px] flex-col items-center gap-[25px]">
          <div className="inline-block w-fit whitespace-nowrap rounded-[10px] border border-[#5F6368] px-2 py-[3.5px]">
            오늘
          </div>
          <div className="flex justify-center text-[35px] font-extrabold">
            {dailyHiting < 0 ? 0 : dailyHiting}
          </div>
        </div>
      </div>
    </div>
  );

export default SearchedHitingEntity;
