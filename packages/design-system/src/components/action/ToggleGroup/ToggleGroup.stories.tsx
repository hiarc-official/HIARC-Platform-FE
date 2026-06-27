import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta = {
  title: 'Design System/Action/ToggleGroup',
  parameters: { docs: { description: { component: '여러 Toggle을 묶은 그룹. type single(단일 선택)·multiple(다중 선택)을 지원합니다.' } } },
  component: ToggleGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="b" variant="outline">
      <ToggleGroupItem value="a">왼쪽</ToggleGroupItem>
      <ToggleGroupItem value="b">가운데</ToggleGroupItem>
      <ToggleGroupItem value="c">오른쪽</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
};
