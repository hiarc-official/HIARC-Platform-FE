import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta = {
  title: 'Design System/Typography/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
  },
  args: { children: '라벨 텍스트' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label size="xs">xs — 가장 작은 라벨</Label>
      <Label size="sm">sm — 작은 라벨</Label>
      <Label size="md">md — 기본 라벨</Label>
      <Label size="lg">lg — 큰 라벨</Label>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label weight="regular">regular</Label>
      <Label weight="medium">medium</Label>
      <Label weight="semibold">semibold</Label>
      <Label weight="bold">bold</Label>
    </div>
  ),
};
