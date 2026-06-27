import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledSelectButton } from './LabeledSelectButton';

const OPTIONS = [
  { value: 'low', label: '하' },
  { value: 'mid', label: '중' },
  { value: 'high', label: '상' },
];

const meta = {
  title: 'Design System/Form/LabeledSelectButton',
  component: LabeledSelectButton,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof LabeledSelectButton>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('mid');
    return <LabeledSelectButton label="난이도" options={OPTIONS} value={value} onChange={setValue} />;
  },
};
