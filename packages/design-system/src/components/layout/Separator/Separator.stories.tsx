import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  title: 'Design System/Layout/Separator',
  parameters: { docs: { description: { component: '얇은 구분선(radix). 가로/세로 방향을 지원합니다.' } } },
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p>섹션 A</p>
      <Separator className="my-3" />
      <p>섹션 B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-3">
      <span>홈</span>
      <Separator orientation="vertical" />
      <span>설정</span>
    </div>
  ),
};
