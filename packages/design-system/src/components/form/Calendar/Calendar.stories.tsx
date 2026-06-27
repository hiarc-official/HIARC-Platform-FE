import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './Calendar';

const meta = {
  title: 'Design System/Form/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'react-day-picker 기반 달력. Radix Popover 와 조합해 데이트피커를 만든다 (LabeledCalanderInput 내부에서 사용). 강조색은 디자인 토큰(primary)으로 덮어쓴다.',
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>();
    return <Calendar mode="range" selected={range} onSelect={setRange} />;
  },
};
