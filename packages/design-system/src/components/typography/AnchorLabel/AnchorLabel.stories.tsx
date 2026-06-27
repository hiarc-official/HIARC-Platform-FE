import type { Meta, StoryObj } from '@storybook/react';
import { AnchorLabel } from './AnchorLabel';

const meta = {
  title: 'Design System/Typography/AnchorLabel',
  component: AnchorLabel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
  },
  args: { href: 'https://hiarc.app', children: 'HIARC 바로가기', target: '_blank' },
} satisfies Meta<typeof AnchorLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
