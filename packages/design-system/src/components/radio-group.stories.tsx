import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta = {
  title: 'Design System/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="beginner" className="flex flex-col gap-2">
      {['beginner', 'intermediate', 'advanced'].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} />
          <span className="text-md">{v}</span>
        </label>
      ))}
    </RadioGroup>
  ),
};
