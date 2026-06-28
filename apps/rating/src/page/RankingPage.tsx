'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DivToggleBar from '../components/DivToggleBar';
import RankingContainer from '../block/RankingContainer';
import DonutChart from '../atoms/DounutChart';
import { useRankingData } from '@/hooks/use-ranking-data';

const DivPage = () => {
  const [selected, setSelected] = useState<number>(0);
  const sp = useSearchParams();
  const { data } = useRankingData(selected);

  useEffect(() => {
    const numParam = sp.get('num');
    if (numParam) {
      setSelected(Number(numParam));
    }
  }, [sp]);

  const rankingData = Array.isArray(data?.rankingData) ? data.rankingData : [];
  const streakRatio = data ? (data.graphData ?? 0) : null;

  return (
    <>
      <div className="pb-5 text-[35px] font-black max-[480px]:ml-4 max-[480px]:w-full">Ranking</div>
      <div className="text-[12px] text-[#5F6368] max-[480px]:mb-5 max-[480px]:ml-[10px]">
        * 점수는 15분 안으로 반영됩니다.
      </div>
      <div className="flex justify-center pb-[45px]">
        <DivToggleBar selected={selected} setSelected={setSelected} />
      </div>
      <div className="mb-10 flex gap-[26px]">
        {/* ponytail: 등장 fade 애니메이션 생략(레이아웃 동일) */}
        <div>
          <RankingContainer rankingData={rankingData} error={null} />
        </div>
        <div className="flex flex-col gap-[20.65px] max-[480px]:hidden">
          <div key={selected}>
            {streakRatio !== null ? (
              <DonutChart
                key={selected}
                value={isNaN(streakRatio) ? 0 : streakRatio}
                div={selected}
                duration={isNaN(streakRatio) ? 0 : streakRatio * 2}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DivPage;
