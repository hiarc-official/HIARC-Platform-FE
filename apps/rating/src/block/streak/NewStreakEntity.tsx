import styled from 'styled-components';
import InfoEntity from '../../atoms/InfoEntity';
import Color from '../../util/Color';
import { DinamicStreakBox } from './DinamicStreakBox';
import StreakInformation from './StreakInformation';
import { Member } from '../../api/StreakApi';
import { parseDivisionString, getDivisionNumber } from '../../util/parseDivision';

const Up = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Devider = styled.div`
  width: 98%;
  border-bottom: 1px solid ${Color.primary};
  margin-top: -1px;
  margin-left: 12px;
  @media (max-width: 480px) {
    width: 92%;
  }
`;

const Down = styled.div`
  margin-top: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 557px;
`;

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

  // tier를 number로 변환

  return (
    <Wrapper>
      <Up>
        <InfoEntity handle={member.bojHandle} div={divisionNumber} tier={member.tier} />
        <Devider></Devider>
      </Up>
      <Down>
        <DinamicStreakBox data={streakData} />
      </Down>
      <StreakInformation
        currentTotalStreak={member.streak.currentTotalStreak}
        currentSeasonStreak={member.streak.currentSeasonStreak}
      />
    </Wrapper>
  );
};

export default NewStreakEntity;
