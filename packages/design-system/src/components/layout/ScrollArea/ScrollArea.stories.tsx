import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './ScrollArea';

const meta = {
  title: 'Design System/Layout/ScrollArea',
  parameters: { docs: { description: { component: '커스텀 스크롤바를 가진 스크롤 영역.' } } },
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border border-gray-200 p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="rounded bg-gray-100 px-3 py-2 text-md">
            항목 {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
