import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Design System/Data Display/Badge',
  parameters: { docs: { description: { component: '상태·분류를 표시하는 작은 뱃지. default/secondary/destructive/outline variant.' } } },
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline'] },
  },
  args: { children: 'Badge' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="destructive">destructive</Badge>
      <Badge variant="outline">outline</Badge>
    </div>
  ),
};
