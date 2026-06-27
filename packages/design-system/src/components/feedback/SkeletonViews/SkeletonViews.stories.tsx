import type { Meta, StoryObj } from '@storybook/react';
import { ListPageSkeleton, DetailPageSkeleton, FormSkeleton } from './SkeletonViews';

const meta = {
  title: 'Design System/Feedback/SkeletonViews',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const List: Story = { render: () => <ListPageSkeleton /> };
export const Detail: Story = { render: () => <DetailPageSkeleton /> };
export const Form: Story = { render: () => <FormSkeleton /> };
