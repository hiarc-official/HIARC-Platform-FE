import type { Meta, StoryObj } from '@storybook/react';
import { SuccessDialog } from './SuccessDialog';
import type { DialogConfig } from '../../../store/dialog-store';

const dialog: DialogConfig = {
  id: 'demo',
  title: '완료되었습니다',
  content: '정상적으로 처리되었습니다.',
  confirmText: '확인',
  cancelText: '취소',
  size: 'md',
};

const meta = {
  title: 'Design System/Overlay/SuccessDialog',
    parameters: { docs: { description: { component: '성공 결과를 알리는 다이얼로그.' } } },
  component: SuccessDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessDialog>;

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
