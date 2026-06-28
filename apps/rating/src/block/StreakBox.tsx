'use client';

import { useState, useEffect } from 'react';
import IndividualBlock from '../components/IndividualBlock';
import StreakBoxArrowButton from '../components/StreakBoxArrowButton';
import { useHitingData } from '@/hooks/use-hiting-data';
import { parseDivisionString } from '../util/parseDivision';
import { Card, SkeletonTransition, useMinimumLoading } from '@hiarc-platform/design-system';
import { StreakCardsSkeleton } from '../components/skeletons';

const StreakBox = (): React.ReactElement => {
  const { data: hitingData, isLoading } = useHitingData();
  const loading = useMinimumLoading(isLoading);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const streakList = hitingData?.streakRanking?.slice(0, 6) ?? [];
  const displayedBlocks = isMobile ? streakList.slice(0, 4) : streakList;

  return (
    <Card className="flex min-h-[342px] w-full min-w-0 flex-1 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-none">
      <StreakBoxArrowButton />
      <div className="mt-4">
        <SkeletonTransition
          loading={loading}
          skeleton={<StreakCardsSkeleton count={isMobile ? 4 : 6} />}
        >
          <div className="grid grid-cols-3 gap-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
            {displayedBlocks.map((streak) => (
              <IndividualBlock
                key={streak.bojHandle}
                tier={streak.tier}
                handle={streak.bojHandle}
                divNum={parseDivisionString(streak.division)}
                totalStreak={streak.streak.currentTotalStreak}
                startDate={streak.streak.streakStartAt}
                memberId={streak.memberId}
              />
            ))}
          </div>
        </SkeletonTransition>
      </div>
    </Card>
  );
};

export default StreakBox;
