import { Title } from '@hiarc-platform/ui';
import { SectionContainer } from '../section-container';
import { HitingListItem } from './hiting-list-item';
import { HitingStatistics } from './hiting-statistics';

interface HitingSectionProps {
  season: number;
  total: number;
  today: number;
  className?: string;
}

export function HitingSection({
  season,
  total,
  today,
  className,
}: HitingSectionProps): React.ReactElement {
  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      <Title size="sm" weight="bold">
        하이팅
      </Title>
      <div className="flex w-full gap-4">
        <HitingStatistics label="시즌" value={season} />
        <HitingStatistics label="누적" value={total} />
        <HitingStatistics label="오늘" value={today} increased={today > 0} />
      </div>
      <SectionContainer>
        <div className="flex w-full flex-col gap-4">
          <HitingListItem name="2025 하이팅 시즌2" rank={10} div={'div1'} />
          <HitingListItem name="2025 하이팅 시즌1" rank={1} div={'div1'} />
          <HitingListItem name="2025 하이팅 시즌3" rank={2} div={'div1'} />
          <HitingListItem name="2025 하이팅 시즌4" rank={3} div={'div1'} />
          <HitingListItem name="2025 하이팅 시즌5" rank={4} div={'div1'} />
        </div>
      </SectionContainer>
    </div>
  );
}
