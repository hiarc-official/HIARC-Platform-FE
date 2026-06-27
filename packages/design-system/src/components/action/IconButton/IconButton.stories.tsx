import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const PLUS = 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z';

const meta = {
  title: 'Design System/Action/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { iconPath: PLUS, iconAlt: 'add' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton iconPath={PLUS} size="sm" />
      <IconButton iconPath={PLUS} size="md" />
      <IconButton iconPath={PLUS} size="lg" />
      <IconButton iconPath={PLUS} size="xl" />
    </div>
  ),
};
