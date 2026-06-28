import { Label } from '@hiarc-platform/design-system';

const HitingStat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-1 flex-col items-center gap-3">
    <Label size="sm" className="text-gray-600">
      {label}
    </Label>
    <span className="text-[32px] font-bold leading-none text-primary-300 tabular-nums">
      {value < 0 ? 0 : value}
    </span>
  </div>
);

const SearchedHitingEntity = ({
  totalHiting,
  seasonHiting,
  dailyHiting,
}: {
  totalHiting: number;
  seasonHiting: number;
  dailyHiting: number;
}) => (
  <div className="flex w-full flex-col gap-2">
    <Label size="lg" weight="bold">
      Hiting
    </Label>
    <div className="flex w-full items-center rounded-2xl border border-gray-200 bg-white p-5 shadow-none">
      <HitingStat label="누적" value={totalHiting} />
      <HitingStat label="이번 시즌" value={seasonHiting} />
      <HitingStat label="오늘" value={dailyHiting} />
    </div>
  </div>
);

export default SearchedHitingEntity;
