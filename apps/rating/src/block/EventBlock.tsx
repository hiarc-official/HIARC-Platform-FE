'use client';

import EventButton from '../components/EventButton';
import EventEntity from '../atoms/EventEntity';
import { useHitingData } from '@/hooks/use-hiting-data';
import { Card, SkeletonTransition, useMinimumLoading } from '@hiarc-platform/design-system';
import { RankRowsSkeleton } from '../components/skeletons';

const EventBlock = (): React.ReactElement => {
  const { data: hitingData, isLoading } = useHitingData();
  const loading = useMinimumLoading(isLoading);

  const eventList = hitingData?.eventRanking?.slice(0, 6) ?? [];

  return (
    <Card className="flex min-h-[342px] w-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-none max-[900px]:w-full">
      <EventButton />
      <div className="mt-4">
        <SkeletonTransition loading={loading} skeleton={<RankRowsSkeleton count={6} />}>
          <div className="flex flex-col">
            {eventList.map((event, index) => (
              <EventEntity
                key={index}
                handle={event.bojHandle}
                tier={event.tier}
                eventHiting={event.currentEventScore}
                rank={index + 1}
                memberId={event.memberId}
              />
            ))}
          </div>
        </SkeletonTransition>
      </div>
    </Card>
  );
};

export default EventBlock;
