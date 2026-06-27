import type { Meta, StoryObj } from '@storybook/react';
import { LabeledInput } from './LabeledInput';

const meta = {
  title: 'Design System/Form/LabeledInput',
  parameters: { docs: { description: { component: '라벨·필수표시·에러메시지를 포함한 입력 필드. 폼에서 가장 많이 쓰입니다.' } } },
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
