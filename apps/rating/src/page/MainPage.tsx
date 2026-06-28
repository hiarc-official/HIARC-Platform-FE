'use client';

import DivBlock from '../block/DivBlock';
import StreakBox from '../block/StreakBox';
import EventBlock from '../block/EventBlock';
import { useHitingData } from '@/hooks/use-hiting-data';

const MainPage = (): React.ReactElement => {
  // 자식들이 같은 queryKey로 useHitingData를 호출해 캐시를 공유하므로
  // 여기서 한 번 호출해 프리패치만 트리거한다.
  useHitingData();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[35px] font-extrabold text-left max-[480px]:w-full max-[480px]:ml-4">
        Hiting
      </div>

      {/* ponytail: 등장 fade 애니메이션 생략(레이아웃 동일) */}
      <DivBlock />
      <div className="flex gap-5 max-[480px]:flex-col-reverse max-[480px]:gap-[52px] max-[480px]:items-center max-[480px]:mb-10">
        <StreakBox />
        <EventBlock />
      </div>
    </div>
  );
};

export default MainPage;
