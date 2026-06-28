'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PageLayout,
  Title,
  Label,
  SkeletonTransition,
  useMinimumLoading,
} from '@hiarc-platform/design-system';
import DivToggleBar from '../components/DivToggleBar';
import RankingContainer from '../block/RankingContainer';
import DonutChart from '../atoms/DounutChart';
import { useRankingData } from '@/hooks/use-ranking-data';
import { TableSkeleton, DonutSkeleton } from '../components/skeletons';
import BackButton from '../components/BackButton';

const DivPage = () => {
  const [selected, setSelected] = useState<number>(0);
  const sp = useSearchParams();
  const { data, isLoading } = useRankingData(selected);
  const loading = useMinimumLoading(isLoading);

  useEffect(() => {
    const numParam = sp.get('num');
    if (numParam) {
      setSelected(Number(numParam));
    }
  }, [sp]);

  const rankingData = Array.isArray(data?.rankingData) ? data.rankingData : [];
  const ratio = data?.graphData ?? 0;

  return (
    <PageLayout containerClassName="flex-col items-stretch justify-start">
      <div className="flex w-full flex-col gap-8">
        <BackButton />
        <div>
          <Title size="sm" weight="bold">
            Ranking
          </Title>
          <Label size="sm" className="mt-1 block text-gray-600">
            * 점수는 15분 안으로 반영됩니다.
          </Label>
        </div>

        <div className="flex justify-center">
          <DivToggleBar selected={selected} setSelected={setSelected} />
        </div>

        {/* 모바일에선 스트릭 유지율(도넛)을 위로 올린다(flex-col-reverse) */}
        <div className="flex items-start gap-6 max-lg:flex-col-reverse">
          <div className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-none max-lg:w-full">
            <SkeletonTransition loading={loading} skeleton={<TableSkeleton rows={8} />}>
              <RankingContainer rankingData={rankingData} error={null} />
            </SkeletonTransition>
          </div>
          <div className="w-[320px] shrink-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-none max-lg:w-full">
            <SkeletonTransition loading={loading} skeleton={<DonutSkeleton />}>
              <DonutChart key={selected} value={isNaN(ratio) ? 0 : ratio} div={selected} />
            </SkeletonTransition>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DivPage;
