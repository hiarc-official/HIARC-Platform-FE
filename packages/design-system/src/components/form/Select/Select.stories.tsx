import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './Select';

const meta = {
  title: 'Design System/Form/Select',
  parameters: { docs: { description: { component: '드롭다운 셀렉트. Trigger/Content/Item 을 조합해 사용합니다.' } } },
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="티어 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bronze">브론즈</SelectItem>
        <SelectItem value="silver">실버</SelectItem>
        <SelectItem value="gold">골드</SelectItem>
        <SelectItem value="platinum">플래티넘</SelectItem>
      </SelectContent>
    </Select>
  ),
};
