'use client';

import { Card } from '@hiarc-platform/design-system';
import InfoEntity from '../../atoms/InfoEntity';
import { DinamicStreakBox } from './DinamicStreakBox';
import StreakInformation from './StreakInformation';
import { Member } from '../../api/StreakApi';
import { parseDivisionString, getDivisionNumber } from '../../util/parseDivision';

interface Props {
  member: Member;
}

const NewStreakEntity = ({ member }: Props) => {
  // API 데이터를 DinamicStreakBox가 기대하는 형식으로 변환
  const streakData = member.streak.streakData.map((item) => ({
    date: item.date,
    count: item.value ? 1 : 0,
  }));

  // Division enum을 사용해서 문자열을 숫자로 파싱
  const divisionEnum = parseDivisionString(member.division);
  const divisionNumber = getDivisionNumber(divisionEnum);

  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_INTRA_API_URL}/member/${member.memberId}`;
  };

  return (
    <Card
      className="group flex w-full cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-none transition-colors hover:border-gray-300"
      onClick={handleClick}
    >
      <InfoEntity handle={member.bojHandle} div={divisionNumber} tier={member.tier} />
      <div className="mt-3 border-b border-gray-100" />
      <div className="mt-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <DinamicStreakBox data={streakData} />
      </div>
      <StreakInformation
        currentTotalStreak={member.streak.currentTotalStreak}
        currentSeasonStreak={member.streak.currentSeasonStreak}
      />
    </Card>
  );
};

export default NewStreakEntity;
