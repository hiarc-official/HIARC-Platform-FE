import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta = {
  title: 'Design System/Progress',
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
