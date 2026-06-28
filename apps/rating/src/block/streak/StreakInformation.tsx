import { Label } from '@hiarc-platform/design-system';

interface Props {
  currentTotalStreak: number;
  currentSeasonStreak: number | null;
}

const StreakInformation = ({ currentTotalStreak, currentSeasonStreak }: Props) => (
    <div className="relative mt-4 flex items-center gap-4 max-[480px]:justify-between max-[480px]:gap-0">
      <div className="flex w-full flex-col gap-2 p-4 max-[480px]:flex-1 max-[480px]:text-center">
        <Label size="sm" weight="regular" className="text-gray-600">
          누적
        </Label>
        <div className="flex items-baseline gap-1 max-[480px]:justify-center">
          <span className="text-[24px] font-bold leading-none text-primary-300 tabular-nums">
            {currentTotalStreak}
          </span>
          <span className="text-sm text-gray-600">days</span>
        </div>
      </div>
      {currentSeasonStreak !== null && (
        <>
          <div className="h-[50px] w-px bg-gray-200 max-[480px]:absolute max-[480px]:left-1/2 max-[480px]:-translate-x-1/2"></div>
          <div className="flex w-full flex-col gap-2 p-4 max-[480px]:flex-1 max-[480px]:text-center">
            <Label size="sm" weight="regular" className="text-gray-600">
              이번시즌
            </Label>
            <div className="flex items-baseline gap-1 max-[480px]:justify-center">
              <span className="text-[24px] font-bold leading-none text-primary-300 tabular-nums">
                {currentSeasonStreak}
              </span>
              <span className="text-sm text-gray-600">days</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

export default StreakInformation;
