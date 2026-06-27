import type { Meta, StoryObj } from '@storybook/react';
import { LabeledSelector } from './LabeledSelector';

const meta = {
  title: 'Design System/Form/LabeledSelector',
  parameters: { docs: { description: { component: '라벨이 있는 셀렉트. options 배열로 항목을 구성합니다.' } } },
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
