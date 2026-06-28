import AdminInput from '../block/adminBlock/AdminInput';
import HistoryCheck from '../block/adminBlock/HistoryCheck';
import { AdminCheckCurrent } from '../block/adminBlock/AdminCheckCurrent';

const adminInputs = [
  '새로운 시즌 시작하기',
  '새로운 이벤트 시작하기',
  '시즌 정보 수정하기',
  '이벤트 수정하기',
];

const adminCheckCurrent = ['핸들별 유저 정보 확인하기'];

const AdminPage = () => (
    <>
      <div className="text-[35px] font-black pb-[40px] max-[480px]:w-full max-[480px]:ml-4">
        관리자 페이지
      </div>
      <HistoryCheck />
      {adminInputs.map((name) => (
        <AdminInput key={name} BlockName={name} />
      ))}
      {adminCheckCurrent.map((name) => (
        <AdminCheckCurrent key={name} blockName={name} />
      ))}
    </>
  );

export default AdminPage;
