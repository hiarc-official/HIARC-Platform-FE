import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './divider';

const meta = {
  title: 'Design System/Divider',
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
