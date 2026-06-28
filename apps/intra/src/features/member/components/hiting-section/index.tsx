import { RatingRecord } from '@/features/member/types/model/rating-record';
import { DesktopHitingSection } from './desktop-hiting-section';
import { MobileHitingSection } from './mobile-hiting-section';

interface HitingSectionProps {
  season: number;
  total: number;
  today: number;
  ratingRecords?: RatingRecord[];
  className?: string;
  isMe?: boolean;
}

export function HitingSection({
  season,
  total,
  today,
  ratingRecords,
  className,
  isMe = true,
}: HitingSectionProps): React.ReactElement {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <DesktopHitingSection
          season={season}
          total={total}
          today={today}
          ratingRecords={ratingRecords}
          className={className}
          isMe={isMe}
        />
      </div>

      {/* Mobile version */}
      <div className="block lg:hidden">
        <MobileHitingSection
          season={season}
          total={total}
          today={today}
          ratingRecords={ratingRecords}
          className={className}
          isMe={isMe}
        />
      </div>
    </>
  );
}
