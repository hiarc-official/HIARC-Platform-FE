import type { Meta, StoryObj } from '@storybook/react';
import { ErrorDialog } from './ErrorDialog';
import type { DialogConfig } from '../../../store/dialog-store';

const dialog: DialogConfig = {
  id: 'demo',
  title: '오류가 발생했습니다',
  content: '잠시 후 다시 시도해 주세요.',
  confirmText: '확인',
  cancelText: '취소',
  size: 'md',
};

const meta = {
  title: 'Design System/Overlay/ErrorDialog',
    parameters: { docs: { description: { component: '오류 상황을 알리는 다이얼로그. 다이얼로그 시스템에서 사용합니다.' } } },
  component: ErrorDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorDialog>;

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
