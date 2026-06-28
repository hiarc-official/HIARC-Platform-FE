'use client';

import { useHitingData } from '@/hooks/use-hiting-data';
import Color from '../util/Color';
import ArrowButton from '../atoms/ArrowButton';
import DivNameTack from './DivNameTack';
import { DivData } from '../types/DataType';

const HitingBox = ({ divNum }: { divNum: number }): React.ReactElement => {
  const { data: hitingData } = useHitingData();

  const divList: DivData[] =
    (divNum === 1
      ? hitingData?.div1Ranking
      : divNum === 2
        ? hitingData?.div2Ranking
        : hitingData?.div3Ranking) ?? [];

  return (
    <div
      className="flex flex-col items-center w-[320px] rounded-[28px] min-h-[300px]"
      style={{ backgroundColor: Color.skybox }}
    >
      <div className="w-full mt-[3%] flex justify-center">
        <ArrowButton divNum={divNum} />
      </div>
      <div className="w-full h-full flex flex-col items-center pt-5">
        {divList.map((item, index) => (
          <DivNameTack
            key={index}
            rank={index + 1}
            id={item.bojHandle}
            tier={item.tier}
            totalHiting={
              item.currentSeasonScore == null ? item.totalScore : item.currentSeasonScore
            }
            memberId={item.memberId}
          />
        ))}
      </div>
    </div>
  );
};

export default HitingBox;
