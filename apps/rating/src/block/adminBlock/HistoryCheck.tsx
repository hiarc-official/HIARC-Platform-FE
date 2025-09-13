import styled from 'styled-components';
import { AdminCheck } from '../../components/adminComponents/AdminCheck';

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  border-bottom: 1px solid black;
`;

const HistoryCheck = () => {
  return (
    <Wrapper>
      <AdminCheck name="season" />
      <AdminCheck name="event" />
      <AdminCheck name="semester" />
    </Wrapper>
  );
};

export default HistoryCheck;
