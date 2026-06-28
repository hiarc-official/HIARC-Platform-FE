import { PageLayout, Title } from '@hiarc-platform/design-system';
import BackButton from '../components/BackButton';
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

const cardClass = 'rounded-2xl border border-gray-200 bg-white p-5 shadow-none';

const AdminPage = () => (
  <PageLayout containerClassName="flex-col items-stretch justify-start">
    <div className="flex w-full flex-col gap-6">
      <BackButton />
      <Title size="sm" weight="bold">
        관리자 페이지
      </Title>

      <div className={cardClass}>
        <HistoryCheck />
      </div>

      {adminInputs.map((name) => (
        <div key={name} className={cardClass}>
          <AdminInput BlockName={name} />
        </div>
      ))}

      {adminCheckCurrent.map((name) => (
        <div key={name} className={cardClass}>
          <AdminCheckCurrent blockName={name} />
        </div>
      ))}
    </div>
  </PageLayout>
);

export default AdminPage;
