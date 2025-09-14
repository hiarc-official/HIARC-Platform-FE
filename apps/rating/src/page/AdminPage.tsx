import AdminInput from '../block/adminBlock/AdminInput';
import HistoryCheck from '../block/adminBlock/HistoryCheck';
import { AdminCheckCurrent } from '../block/adminBlock/AdminCheckCurrent';
import LayOut from '../util/Layout';
import styled from 'styled-components';
const HeadWrapper = styled.div`
  font-size: 35px;
  font-weight: 900;

  padding-bottom: 40px;
  @media (max-width: 480px) {
    width: 100%;
    margin-left: 16px;
  }
`;

const adminInputs = [
  '새로운 시즌 시작하기',
  '새로운 이벤트 시작하기',
  '시즌 정보 수정하기',
  '이벤트 수정하기',
];

const adminCheckCurrent = ['핸들별 유저 정보 확인하기'];

const AdminPage = () => {
  return (
    <LayOut>
      <HeadWrapper>관리자 페이지</HeadWrapper>
      <HistoryCheck />
      {adminInputs.map((name) => (
        <AdminInput key={name} BlockName={name} />
      ))}
      {adminCheckCurrent.map((name) => (
        <AdminCheckCurrent key={name} blockName={name} />
      ))}
    </LayOut>
  );
};

export default AdminPage;
