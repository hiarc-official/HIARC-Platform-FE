'use client';

import { AdminExplain } from '../../util/AdminExplain';
import { resetAdminData } from '../../api/AdminApi';

const AdminEnd = ({ endName }: { endName: string }) => {
  const handleButtonClick = async () => {
    try {
      const type = endName === '시즌 끝내기 (점수 초기화)' ? 'season' : 'event';
      resetAdminData(type);
      alert('초기화에 성공하였습니다.');
    } catch (error) {
      alert('실패!!!!!!');
    }
  };
  return (
    <div className="border-b border-black">
      <div className="text-[17.5px] font-bold mt-[45px] mb-[29px]">{endName}</div>
      <div className="text-[13px] font-semibold">
        <pre>{AdminExplain[endName]}</pre>
      </div>
      <button
        className="bg-[#ffa5a5] border-none rounded-[12px] p-3 mb-[41px] cursor-pointer hover:bg-primary"
        onClick={handleButtonClick}
      >
        초기화 하기
      </button>
    </div>
  );
};

export default AdminEnd;
