import type { Meta, StoryObj } from '@storybook/react';
import { LoadingDots } from './LoadingDots';

const meta = {
  title: 'Design System/Feedback/LoadingDots',
  parameters: { docs: { description: { component: '점 3개가 튀는 로딩 인디케이터. size로 크기를 조절합니다.' } } },
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
