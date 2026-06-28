import type { Meta, StoryObj } from '@storybook/react';
import { SlideFade } from './SlideFade';

const meta = {
  title: 'Design System/Motion/SlideFade',
  parameters: { docs: { description: { component: '마운트 시 슬라이드+페이드로 등장하는 래퍼.' } } },
  component: SlideFade,
  tags: ['autodocs'],
} satisfies Meta<typeof SlideFade>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <SlideFade className="rounded-lg bg-gray-100 p-6">
      마운트 시 슬라이드+페이드로 등장하는 콘텐츠
    </SlideFade>
  ),
};
