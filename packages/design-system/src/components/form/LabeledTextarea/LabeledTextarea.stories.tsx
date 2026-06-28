import type { Meta, StoryObj } from '@storybook/react';
import { LabeledTextarea } from './LabeledTextarea';

const meta = {
  title: 'Design System/Form/LabeledTextarea',
  parameters: { docs: { description: { component: '라벨과 에러 표시를 포함한 멀티라인 입력 영역.' } } },
  component: LabeledTextarea,
  tags: ['autodocs'],
  args: { label: '자기소개', placeholder: '간단히 작성해 주세요' },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof LabeledTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithError: Story = { args: { error: '필수 입력 항목입니다' } };
