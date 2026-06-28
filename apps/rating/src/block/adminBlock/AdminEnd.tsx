'use client';

import { Button, Label } from '@hiarc-platform/design-system';
import { DialogUtil } from '@hiarc-platform/design-system';
import { AdminExplain } from '../../util/AdminExplain';
import { resetAdminData } from '../../api/AdminApi';

const AdminEnd = ({ endName }: { endName: string }) => {
  const handleButtonClick = async () => {
    try {
      const type = endName === '시즌 끝내기 (점수 초기화)' ? 'season' : 'event';
      resetAdminData(type);
      DialogUtil.showSuccess('초기화에 성공하였습니다.');
    } catch (error) {
      DialogUtil.showError('실패!!!!!!');
    }
  };
  return (
    <div className="flex flex-col items-start gap-4">
      <Label size="lg" weight="bold" className="block">
        {endName}
      </Label>
      <Label size="sm" weight="semibold" className="block whitespace-pre-wrap text-gray-600">
        {AdminExplain[endName]}
      </Label>
      <Button size="sm" onClick={handleButtonClick}>
        초기화 하기
      </Button>
    </div>
  );
};

export default AdminEnd;
