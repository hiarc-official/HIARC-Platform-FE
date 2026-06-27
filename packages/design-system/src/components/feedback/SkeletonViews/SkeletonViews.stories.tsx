import type { Meta, StoryObj } from '@storybook/react';
import { ListPageSkeleton, DetailPageSkeleton, FormSkeleton } from './SkeletonViews';

const meta = {
  title: 'Design System/Feedback/SkeletonViews',
  parameters: {
    docs: { description: { component: '리스트·상세·폼 등 페이지 단위 스켈레톤 레이아웃 모음.' } }, layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const List: Story = { render: () => <ListPageSkeleton /> };
export const Detail: Story = { render: () => <DetailPageSkeleton /> };
export const Form: Story = { render: () => <FormSkeleton /> };
