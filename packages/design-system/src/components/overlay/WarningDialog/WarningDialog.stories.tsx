import type { Meta, StoryObj } from '@storybook/react';
import { WarningDialog } from './WarningDialog';
import type { DialogConfig } from '../../../store/dialog-store';

const dialog: DialogConfig = {
  id: 'demo',
  title: '주의',
  content: '이 작업은 신중하게 진행하세요.',
  confirmText: '확인',
  cancelText: '취소',
  size: 'md',
};

const meta = {
  title: 'Design System/Overlay/WarningDialog',
  component: WarningDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof WarningDialog>;

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
