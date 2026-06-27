import type { Meta, StoryObj } from '@storybook/react';
import { PageableModel } from '@hiarc-platform/shared';
import { Pagination } from './Pagination';

const meta = {
  title: 'Design System/Data Display/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const model = new PageableModel<unknown>({
      content: [],
      totalPages: 10,
      totalElements: 100,
      size: 10,
      number: 2,
    });
    return <Pagination pageableModel={model} onPageChange={(p) => console.log('page', p)} />;
  },
};
