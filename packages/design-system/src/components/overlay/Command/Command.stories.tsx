import type { Meta, StoryObj } from '@storybook/react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from './Command';

const meta = {
  title: 'Design System/Overlay/Command',
  component: Command,
  tags: ['autodocs'],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border border-gray-200">
      <CommandInput placeholder="검색..." />
      <CommandList>
        <CommandEmpty>결과가 없습니다.</CommandEmpty>
        <CommandGroup heading="메뉴">
          <CommandItem>대시보드</CommandItem>
          <CommandItem>스터디</CommandItem>
          <CommandItem>공지사항</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
