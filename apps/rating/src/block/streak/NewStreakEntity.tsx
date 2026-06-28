'use client';

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
    <div className="flex flex-col w-[557px] cursor-pointer max-[480px]:w-[335px]" onClick={handleClick}>
      <div className="flex w-full flex-col">
        <InfoEntity handle={member.bojHandle} div={divisionNumber} tier={member.tier} />
        <div className="w-[98%] border-b border-primary mt-[-1px] ml-3 max-[480px]:w-[92%]"></div>
      </div>
      <div className="mt-4 max-[480px]:overflow-x-auto max-[480px]:w-full max-[480px]:text-center max-[480px]:[scrollbar-width:none] max-[480px]:[-ms-overflow-style:none] max-[480px]:[&::-webkit-scrollbar]:hidden">
        <DinamicStreakBox data={streakData} />
      </div>
      <StreakInformation
        currentTotalStreak={member.streak.currentTotalStreak}
        currentSeasonStreak={member.streak.currentSeasonStreak}
      />
    </div>
  );
};

export default NewStreakEntity;
