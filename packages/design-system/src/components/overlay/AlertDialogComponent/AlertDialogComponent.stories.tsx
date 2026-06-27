import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogComponent } from './AlertDialogComponent';
import type { DialogConfig } from '../../../store/dialog-store';

const dialog: DialogConfig = {
  id: 'demo',
  title: '알림',
  content: '확인이 필요한 내용입니다.',
  confirmText: '확인',
  cancelText: '취소',
  size: 'md',
};

const meta = {
  title: 'Design System/Overlay/AlertDialogComponent',
    parameters: { docs: { description: { component: '다이얼로그 시스템용 알림 다이얼로그 컴포넌트.' } } },
  component: AlertDialogComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialogComponent>;

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
