import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Button } from '../../action/Button/Button';

const meta = {
  title: 'Design System/Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="line">열기</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-md">팝오버 안의 콘텐츠입니다.</p>
      </PopoverContent>
    </Popover>
  ),
};
