'use client';

import { useHitingData } from '@/hooks/use-hiting-data';
import ArrowButton from '../atoms/ArrowButton';
import DivNameTack from './DivNameTack';
import { DivData } from '../types/DataType';
import { Card, SkeletonTransition, useMinimumLoading } from '@hiarc-platform/design-system';
import { RankRowsSkeleton } from './skeletons';

const HitingBox = ({ divNum }: { divNum: number }): React.ReactElement => {
  const { data: hitingData, isLoading } = useHitingData();
  const loading = useMinimumLoading(isLoading);

  const divList: DivData[] =
    (divNum === 1
      ? hitingData?.div1Ranking
      : divNum === 2
        ? hitingData?.div2Ranking
        : hitingData?.div3Ranking) ?? [];

  return (
    <Card className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-none min-h-[300px]">
      <ArrowButton divNum={divNum} />
      <div className="mt-4">
        <SkeletonTransition loading={loading} skeleton={<RankRowsSkeleton count={5} />}>
          <div className="flex flex-col">
            {divList.map((item, index) => (
              <DivNameTack
                key={index}
                rank={index + 1}
                id={item.bojHandle}
                tier={item.tier}
                totalHiting={item.currentSeasonScore == null ? item.totalScore : item.currentSeasonScore}
                memberId={item.memberId}
              />
            ))}
          </div>
        </SkeletonTransition>
      </div>
    </Card>
  );
};

export default HitingBox;
