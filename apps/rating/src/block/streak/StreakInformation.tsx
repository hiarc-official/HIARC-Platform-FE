interface Props {
  currentTotalStreak: number;
  currentSeasonStreak: number | null;
}

const StreakInformation = ({ currentTotalStreak, currentSeasonStreak }: Props) => (
    <div className="flex gap-4 items-center relative max-[480px]:justify-between max-[480px]:gap-0">
      <div className="p-4 flex gap-2 flex-col w-full max-[480px]:flex-1 max-[480px]:text-center">
        <div className="font-normal text-[14px] leading-[1.5]">누적</div>
        <div className="flex items-center max-[480px]:justify-center">
          <div className="text-[24px] leading-[1.5] font-bold">{currentTotalStreak}</div>
          <div className="text-[16px] leading-[1.5] font-normal">days</div>
        </div>
      </div>
      {currentSeasonStreak !== null && (
        <>
          <div className="h-[50px] w-px bg-[#dedeeb] max-[480px]:absolute max-[480px]:left-1/2 max-[480px]:-translate-x-1/2"></div>
          <div className="p-4 flex gap-2 flex-col w-full max-[480px]:flex-1 max-[480px]:text-center">
            <div className="font-normal text-[14px] leading-[1.5]">이번시즌</div>
            <div className="flex items-center max-[480px]:justify-center">
              <div className="text-[24px] leading-[1.5] font-bold">{currentSeasonStreak}</div>
              <div className="text-[16px] leading-[1.5] font-normal">days</div>
            </div>
          </div>
        </>
      )}
    </div>
  );

export default StreakInformation;
