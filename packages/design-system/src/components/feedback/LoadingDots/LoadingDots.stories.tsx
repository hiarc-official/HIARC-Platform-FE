import type { Meta, StoryObj } from '@storybook/react';
import { LoadingDots } from './LoadingDots';

const meta = {
  title: 'Design System/Feedback/LoadingDots',
  component: LoadingDots,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof LoadingDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LoadingDots size="sm" />
      <LoadingDots size="md" />
      <LoadingDots size="lg" />
    </div>
  ),
};
