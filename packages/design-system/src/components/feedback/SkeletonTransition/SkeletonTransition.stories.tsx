import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { SkeletonTransition } from './SkeletonTransition';
import { ListPageSkeleton } from '../SkeletonViews/SkeletonViews';

const meta = {
  title: 'Design System/Feedback/SkeletonTransition',
  component: SkeletonTransition,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '로딩이 끝나면 콘텐츠를 페이드 인 해 스켈레톤→콘텐츠 전환을 부드럽게 한다. useMinimumLoading 결과를 loading 으로 넘겨 사용한다.',
      },
    },
  },
} satisfies Meta<typeof SkeletonTransition>;

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);
    // 1.2초 뒤 로딩 종료 → 콘텐츠 페이드 인. 버튼으로 다시 재생 가능.
    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(t);
    }, [loading]);

    return (
      <div className="p-6">
        <button
          className="mb-4 rounded-md bg-primary-300 px-3 py-1 text-white"
          onClick={() => setLoading(true)}
        >
          다시 로딩
        </button>
        <SkeletonTransition loading={loading} skeleton={<ListPageSkeleton />}>
          <div className="rounded-lg border border-gray-200 p-10 text-center text-lg">
            실제 콘텐츠 영역 — 페이드 인으로 등장합니다.
          </div>
        </SkeletonTransition>
      </div>
    );
  },
};
