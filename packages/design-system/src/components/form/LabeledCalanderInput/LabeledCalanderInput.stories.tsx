import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledCalanderInput } from './LabeledCalanderInput';

const meta = {
  title: 'Design System/Form/LabeledCalanderInput',
  parameters: { docs: { description: { component: '라벨이 있는 날짜 선택 입력. 단일 날짜·기간(rangeMode)·시간 선택을 지원합니다.' } } },
  component: LabeledCalanderInput,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof LabeledCalanderInput>;

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <LabeledCalanderInput
        label="시작일"
        placeholder="날짜 선택"
        value={date}
        onChange={(v) => setDate(v as Date | null)}
      />
    );
  },
};
