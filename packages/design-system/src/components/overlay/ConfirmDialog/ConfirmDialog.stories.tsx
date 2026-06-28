import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog } from './ConfirmDialog';
import type { DialogConfig } from '../../../store/dialog-store';

const dialog: DialogConfig = {
  id: 'demo',
  title: '삭제하시겠어요?',
  content: '이 작업은 되돌릴 수 없습니다.',
  confirmText: '확인',
  cancelText: '취소',
  size: 'md',
};

const meta = {
  title: 'Design System/Overlay/ConfirmDialog',
    parameters: { docs: { description: { component: '확인/취소 두 버튼을 가진 확인 다이얼로그. 다이얼로그 시스템(DialogUtil)에서 사용합니다.' } } },
  component: ConfirmDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dialog,
    showBackground: false,
    onConfirm: () => console.log('confirm'),
    onCancel: () => console.log('cancel'),
    onClose: () => console.log('close'),
  },
};
