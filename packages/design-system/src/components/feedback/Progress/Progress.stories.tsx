import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Design System/Feedback/Progress',
  parameters: { docs: { description: { component: '진행률 막대. value(0~100)로 채워집니다.' } } },
  component: Progress,
  tags: ['autodocs'],
  argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } },
  args: { value: 60 },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
};
