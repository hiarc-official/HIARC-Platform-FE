import { Label } from '@hiarc-platform/design-system';
import CircularProgress from '../atoms/CircularProgress';
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
  <div className="flex w-full flex-col gap-2">
    <Label size="lg" weight="bold">
      Streak
    </Label>
    <div className="flex w-full flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-none">
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <Label size="sm" className="text-gray-600">
            이번 시즌
          </Label>
          <CircularProgress value={seasonStreak} maxValue={seasonTotal} width={60} height={60} />
        </div>
        <div className="flex flex-col gap-1">
          <Label size="sm" className="text-gray-600">
            누적 · {startDate}부터
          </Label>
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-bold leading-none text-primary-300 tabular-nums">
              {totalStreak}
            </span>
            <span className="text-sm text-gray-600">일 연속</span>
          </div>
        </div>
      </div>
      {/* ponytail: 기여도 격자 — tier별 동적 색 유지 */}
      <div className="grid w-fit grid-cols-[repeat(20,13px)] gap-px max-[480px]:grid-cols-[repeat(10,13px)]">
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
);

export default SearchedStreakEntity;
