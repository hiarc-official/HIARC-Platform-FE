import type { Meta, StoryObj } from '@storybook/react';
import { InfoDialog } from './InfoDialog';
import type { DialogConfig } from '../../../store/dialog-store';

const dialog: DialogConfig = {
  id: 'demo',
  title: '안내',
  content: '변경 사항이 저장되었습니다.',
  confirmText: '확인',
  cancelText: '취소',
  size: 'md',
};

const meta = {
  title: 'Design System/Overlay/InfoDialog',
    parameters: { docs: { description: { component: '안내성 다이얼로그.' } } },
  component: InfoDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof InfoDialog>;

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
