import type { Meta, StoryObj } from '@storybook/react';
import { LabeledSelector } from './labeled-selector';

const meta = {
  title: 'Design System/Select/LabeledSelector',
  component: LabeledSelector,
  tags: ['autodocs'],
  args: {
    label: '난이도',
    placeholder: '선택하세요',
    options: [
      { value: 'bronze', label: '브론즈' },
      { value: 'silver', label: '실버' },
      { value: 'gold', label: '골드' },
    ],
  },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
} satisfies Meta<typeof LabeledSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
