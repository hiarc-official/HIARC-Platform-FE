import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Design System/Layout/Divider',
  parameters: { docs: { description: { component: '구분선. 가로/세로 방향과 임의 길이(인라인 스타일)를 지원합니다.' } } },
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p>위 영역</p>
      <Divider variant="horizontal" size="full" className="my-3" />
      <p>아래 영역</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-3">
      <span>왼쪽</span>
      <Divider variant="vertical" size="full" />
      <span>오른쪽</span>
    </div>
  ),
};
