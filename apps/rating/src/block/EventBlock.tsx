'use client';

import EventButton from '../components/EventButton';
import EventEntity from '../atoms/EventEntity';
import { useHitingData } from '@/hooks/use-hiting-data';

const EventBlock = (): React.ReactElement => {
  const { data: hitingData } = useHitingData();

  const eventList = hitingData?.eventRanking?.slice(0, 6) ?? [];

  return (
    <div className="w-[255px] h-[342px] bg-[#fffced] rounded-[28px] flex items-center flex-col gap-[22.6px] max-[480px]:w-[320px]">
      <div className="mt-[15.18px]">
        <EventButton />
      </div>
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
    </div>
  );
};

export default EventBlock;
