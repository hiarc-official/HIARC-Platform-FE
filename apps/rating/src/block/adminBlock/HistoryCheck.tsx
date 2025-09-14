import styled from 'styled-components';
import { AdminCheck } from '../../components/adminComponents/AdminCheck';
import { SeasonRankingCheck } from '../../components/adminComponents/SeasonRankingCheck';
import { EventRankingCheck } from '../../components/adminComponents/EventRankingCheck';

const MainWrapper = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 20px;
`;

const FirstRow = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const SecondRow = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const ThirdRow = styled.div`
  display: flex;
  gap: 40px;
`;

const HistoryCheck = () => {
  return (
    <MainWrapper>
      <FirstRow>
        <AdminCheck name="season" />
        <AdminCheck name="event" />
        <AdminCheck name="semester" />
      </FirstRow>
      <SecondRow>
        <SeasonRankingCheck division={1} />
        <SeasonRankingCheck division={2} />
        <SeasonRankingCheck division={3} />
      </SecondRow>
      <ThirdRow>
        <EventRankingCheck />
      </ThirdRow>
    </MainWrapper>
  );
};

export default HistoryCheck;
