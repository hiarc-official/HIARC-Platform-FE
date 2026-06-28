import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';

const meta = {
  title: 'Design System/Layout/Resizable',
  parameters: { docs: { description: { component: '드래그로 크기를 조절하는 패널 그룹.' } } },
  component: ResizablePanelGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-48 w-96 rounded-lg border border-gray-200"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center">왼쪽</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center">오른쪽</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
