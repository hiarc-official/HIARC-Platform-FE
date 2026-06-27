import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerStyles } from './DatePickerStyles';

// react-datepicker 전역 스타일을 주입하는 유틸 컴포넌트 (자체로는 시각 요소가 없음).
const meta = {
  title: 'Design System/Form/DatePickerStyles',
  parameters: { docs: { description: { component: 'react-datepicker 전역 스타일을 주입하는 유틸 컴포넌트(시각 요소 없음).' } } },
  component: DatePickerStyles,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePickerStyles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="text-sm text-gray-600">
      <DatePickerStyles />
      react-datepicker 캘린더 스타일을 주입하는 컴포넌트입니다. LabeledCalanderInput 과 함께 사용됩니다.
    </div>
  ),
};
