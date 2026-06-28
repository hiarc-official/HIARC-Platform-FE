import RankingContainerExplainBar from '../components/RankingContainerExplainBar';
import RankingEntity from '../components/RankingEntity';

interface RankingContainerProps {
  rankingData: Array<{
    num: number;
    bojHandle: string;
    tier: number;
    today: number;
    totalScore: number;
    currentSeasonScore: number | null;
    memberId: number;
  }>;
  error: string | null;
}

const RankingContiner = ({ rankingData, error }: RankingContainerProps) => {
  if (error) {return <p>오류 발생: {error}</p>;}

  return (
    <div className="flex w-[673px] flex-col max-[480px]:w-[342px]">
      <RankingContainerExplainBar />
      {rankingData.map(({ num, bojHandle, tier, today, totalScore, currentSeasonScore, memberId }) => (
        <RankingEntity
          key={num}
          ranking={num}
          handle={bojHandle}
          tier={tier}
          today={today}
          total={currentSeasonScore !== null ? currentSeasonScore : totalScore}
          event={false} // RankingApi에서 event 필드가 없으므로 기본값으로 설정
          memberId={memberId}
        />
      ))}
    </div>
  );
};

export default RankingContiner;
