import type { Meta, StoryObj } from '@storybook/react';
import { LabeledInput } from './labeled-input';

const meta = {
  title: 'Design System/Input/LabeledInput',
  component: LabeledInput,
  tags: ['autodocs'],
  args: { label: '이름', placeholder: '홍길동' },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof LabeledInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithError: Story = {
  args: { error: '필수 입력 항목입니다', value: '' },
};
