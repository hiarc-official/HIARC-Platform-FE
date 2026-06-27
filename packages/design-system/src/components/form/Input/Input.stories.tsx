import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Design System/Form/Input',
  parameters: { docs: { description: { component: '기본 텍스트 입력 필드. variant search 시 검색 아이콘이 붙습니다.' } } },
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'search'] },
  },
  args: { placeholder: '입력하세요' },
  decorators: [
    (Story): ReactElement => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Search: Story = {
  args: { variant: 'search', placeholder: '검색' },
};

export const Disabled: Story = {
  args: { disabled: true, value: '수정 불가' },
};
