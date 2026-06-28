import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta = {
  title: 'Design System/Layout/AspectRatio',
  parameters: { docs: { description: { component: '자식 요소를 지정 비율로 유지하는 컨테이너.' } } },
  component: AspectRatio,
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ratio16x9: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary-100 text-white">
          16 : 9
        </div>
      </AspectRatio>
    </div>
  ),
};
