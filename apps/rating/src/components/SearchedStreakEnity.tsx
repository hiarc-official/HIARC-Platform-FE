import CircularProgress from '../atoms/CircularProgress';
import Color from '../util/Color';
import { NumberToStreakColor } from '../util/NumberToStreakColor';

const SearchedStreakEntity = ({
  seasonStreak,
  seasonTotal,
  totalStreak,
  tier,
  startDate,
}: {
  seasonStreak: number;
  seasonTotal: number;
  totalStreak: number;
  tier: number;
  startDate: string;
}) => (
    <div className="flex w-[460px] flex-col gap-px max-[480px]:w-[325px]">
      <div className="w-[38px] rounded-[18px] border border-primary px-[14px] py-[6px] text-[12px] font-bold text-primary">
        Streak
      </div>
      <div className="flex min-h-[146px] w-full gap-[24.33px] rounded-[15px] border border-primary px-5 pb-0 pt-5 max-[480px]:p-2">
        <div className="flex w-[63px] flex-col gap-[6px]">
          <div
            className="mb-[3px] flex h-5 flex-nowrap items-center justify-center rounded-[12px] border-[0.5px] px-2 text-[10px]"
            style={{ borderColor: Color.graySub3 }}
          >
            이번 시즌
          </div>
          <CircularProgress value={seasonStreak} maxValue={seasonTotal} width={60} height={60} />
        </div>
        <div className="flex flex-col gap-[9px]">
          <div className="flex gap-1">
            <div
              className="mb-[3px] flex h-5 flex-nowrap items-center justify-center rounded-[12px] border-[0.5px] px-2 text-[10px]"
              style={{ borderColor: Color.graySub3 }}
            >
              누적
            </div>
            <div
              className="mb-[3px] flex h-5 flex-nowrap items-center justify-center rounded-[12px] border-[0.5px] px-2 text-[10px]"
              style={{ borderColor: Color.primary }}
            >
              {startDate}부터
            </div>
          </div>
          <div className="flex gap-[22px]">
            <div className="mt-[13px] flex h-[35px] w-[73px] items-end text-[15px] font-black">
              <div className="text-[35px]">{totalStreak}</div>
              <div className="mb-1">일</div>
            </div>
            <div className="grid h-fit w-fit max-w-[273px] grid-cols-[repeat(20,13px)] gap-px max-[480px]:max-w-[139px] max-[480px]:grid-cols-[repeat(10,13px)]">
              {Array.from({ length: totalStreak }, (_, i) => (
                <div
                  key={i}
                  className="h-[13px] w-[13px] rounded-[2px]"
                  style={{ backgroundColor: NumberToStreakColor(tier) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default SearchedStreakEntity;
