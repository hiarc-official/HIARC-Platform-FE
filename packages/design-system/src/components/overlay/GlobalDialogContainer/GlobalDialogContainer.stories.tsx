import type { Meta, StoryObj } from '@storybook/react';
import { GlobalDialogContainer } from './GlobalDialogContainer';
import { DialogUtil } from '../../../utils/dialog-util';
import { Button } from '../../action/Button/Button';

// 전역 다이얼로그 시스템: DialogUtil 로 열면 컨테이너가 스토어를 구독해 렌더한다.
const meta = {
  title: 'Design System/Overlay/GlobalDialogContainer',
  component: GlobalDialogContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof GlobalDialogContainer>;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => DialogUtil.showConfirm('정말 삭제할까요?')}>Confirm</Button>
      <Button variant="secondary" onClick={() => DialogUtil.showInfo('저장되었습니다.', '안내')}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => DialogUtil.showSuccess('완료되었습니다.')}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => DialogUtil.showWarning('주의가 필요합니다.')}>
        Warning
      </Button>
      <Button variant="line" onClick={() => DialogUtil.showError('오류가 발생했습니다.')}>
        Error
      </Button>
      <GlobalDialogContainer />
    </div>
  ),
};
