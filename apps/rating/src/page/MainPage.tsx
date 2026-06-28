'use client';

import DivBlock from '../block/DivBlock';
import StreakBox from '../block/StreakBox';
import EventBlock from '../block/EventBlock';
import { useHitingData } from '@/hooks/use-hiting-data';
import { PageLayout, Title, Label } from '@hiarc-platform/design-system';

const MainPage = (): React.ReactElement => {
  // 자식들이 같은 queryKey로 useHitingData를 호출해 캐시를 공유하므로
  // 여기서 한 번 호출해 프리패치만 트리거한다.
  useHitingData();

  return (
    <PageLayout containerClassName="flex-col items-stretch justify-start">
      <div className="flex w-full flex-col gap-8">
        <div>
          <Title size="sm" weight="bold">
            Hiting
          </Title>
          <Label size="sm" className="mt-1 block text-gray-600">
            실시간 코딩 스트릭 · 레이팅
          </Label>
        </div>

        <DivBlock />

        <div className="flex gap-6 max-lg:flex-col">
          <StreakBox />
          <EventBlock />
        </div>
      </div>
    </PageLayout>
  );
};

export default MainPage;
