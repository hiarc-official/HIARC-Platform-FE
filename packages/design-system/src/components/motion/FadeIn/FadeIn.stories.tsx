import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FadeIn } from './FadeIn';

const meta = {
  title: 'Design System/Motion/FadeIn',
  component: FadeIn,
  tags: ['autodocs'],
} satisfies Meta<typeof FadeIn>;

export default meta;
type Story = StoryObj;

export const Toggle: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="flex flex-col items-start gap-4">
        <button
          className="rounded-md bg-primary-300 px-3 py-1 text-white"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? '숨기기' : '보이기'}
        </button>
        <FadeIn isVisible={visible} className="rounded-lg bg-gray-100 p-6">
          페이드 인/아웃 되는 콘텐츠
        </FadeIn>
      </div>
    );
  },
};
