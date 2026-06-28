import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Design System/Form/Textarea',
  parameters: { docs: { description: { component: '여러 줄 텍스트 입력 영역.' } } },
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: '내용을 입력하세요', rows: 4 },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: '수정 불가' } };
