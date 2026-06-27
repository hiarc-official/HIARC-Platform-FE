import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';

const meta = {
  title: 'Design System/Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageLayout>
      <div className="rounded-lg bg-gray-100 p-10 text-center">페이지 본문 영역</div>
    </PageLayout>
  ),
};
