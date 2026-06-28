import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from './BackButton';

const meta = {
  title: 'Design System/Action/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '뒤로가기 화살표 버튼. onClick으로 이전 화면 이동 등을 처리합니다.' } }, layout: 'centered' },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onClick: () => console.log('back') },
};
