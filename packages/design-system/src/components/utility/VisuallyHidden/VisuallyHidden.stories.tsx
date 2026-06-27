import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden';

// 시각적으로는 숨기되 스크린리더에는 읽히는 접근성 유틸.
const meta = {
  title: 'Design System/Utility/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <button className="rounded-md bg-primary-300 p-2 text-white">
      ✕<VisuallyHidden>닫기</VisuallyHidden>
    </button>
  ),
};
