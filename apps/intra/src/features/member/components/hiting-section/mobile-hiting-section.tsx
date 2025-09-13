import { Label, Title } from '@hiarc-platform/ui';
import { SectionContainer } from '../section-container';
import { HitingListItem } from './hiting-list-item';
import { HitingStatistics } from './hiting-statistics';
import { RatingRecord } from '@/features/member/types/model/rating-record';
import Image from 'next/image';

interface MobileHitingSectionProps {
  season: number;
  total: number;
  today: number;
  ratingRecords?: RatingRecord[];
  className?: string;
  isMe?: boolean;
}

export function MobileHitingSection({
  season,
  total,
  today,
  ratingRecords,
  className,
  isMe = true,
}: MobileHitingSectionProps): React.ReactElement {
  return (
    <div className={`flex w-full flex-col gap-4 ${className}`}>
      {/* Title with today stats */}
      <div className="flex items-center justify-between">
        <Title size="xs" weight="bold">
          하이팅
        </Title>
        <div className="flex items-center gap-2">
          <Label size="md" weight="regular" className="text-gray-600">
            오늘
          </Label>
          <Title size="xs" weight="bold">
            {today}
          </Title>
          {today > 0 && (
            <Image src="/shared-assets/ArrowUp.svg" alt="ArrowUp" width={16} height={16} />
          )}
        </div>
      </div>

      {/* Season and total only */}
      <div className="flex w-full gap-4">
        <HitingStatistics label="시즌" value={season} />
        <HitingStatistics label="누적" value={total} />
      </div>

      <SectionContainer>
        {ratingRecords && ratingRecords.length > 0 ? (
          <div className="flex w-full flex-col gap-4">
            {ratingRecords.map((record, index) => (
              <HitingListItem
                key={index}
                name={record.description ?? ''}
                rank={record.ranking ?? 0}
                div={'DIV_1'}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col  justify-center">
            <Label size="lg" weight="regular" className="text-center text-gray-700">
              {isMe ? '하이팅에 참여하시고, 10위 안에 도전해보세요!' : '하이팅 참여 기록이 없어요.'}
            </Label>
            {isMe && (
              <Label
                size="lg"
                weight="regular"
                className="cursor-pointer text-center text-gray-700 underline"
                onClick={() => window.open('https://rating.hiarc-official.com', '_blank')}
              >
                하이팅 바로가기
              </Label>
            )}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
