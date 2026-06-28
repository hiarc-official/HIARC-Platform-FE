'use client';

import { useState, useEffect } from 'react';
import IndividualBlock from '../components/IndividualBlock';
import StreakBoxArrowButton from '../components/StreakBoxArrowButton';
import { useHitingData } from '@/hooks/use-hiting-data';
import { parseDivisionString } from '../util/parseDivision';
import Color from '../util/Color';

const StreakBox = (): React.ReactElement => {
  const { data: hitingData, isLoading: loading } = useHitingData();
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
    <div
      className="w-[725px] rounded-[28px] min-h-[342px] min-w-[320px] flex flex-col max-[480px]:w-[320px]"
      style={{ backgroundColor: Color.skybox }}
    >
      <div className="w-full mt-[15px] flex justify-center">
        <StreakBoxArrowButton />
      </div>
      {loading ? (
        <p className="text-center p-5">로딩 중...</p>
      ) : (
        <div className="w-full h-full flex flex-wrap gap-3 items-start grow py-3 px-[18px]">
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
      )}
    </div>
  );
};

export default StreakBox;
