import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NumberInput } from './NumberInput';

const meta = {
  title: 'Design System/Form/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <NumberInput length={6} value={value} onChange={setValue} />;
  },
};
