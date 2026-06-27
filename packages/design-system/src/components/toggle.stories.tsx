import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const meta = {
  title: 'Design System/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
  },
  args: { children: 'B' },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3">
      <Toggle variant="default">기본</Toggle>
      <Toggle variant="outline">아웃라인</Toggle>
      <Toggle defaultPressed>켜짐</Toggle>
    </div>
  ),
};
