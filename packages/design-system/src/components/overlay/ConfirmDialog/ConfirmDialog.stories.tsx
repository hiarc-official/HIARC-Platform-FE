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
