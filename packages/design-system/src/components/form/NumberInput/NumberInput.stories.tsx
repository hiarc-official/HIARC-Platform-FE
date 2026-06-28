import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NumberInput } from './NumberInput';

const meta = {
  title: 'Design System/Form/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '자릿수(length)가 고정된 숫자 입력. 인증코드 등 칸 단위 입력에 사용합니다.' } }, layout: 'centered' },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <NumberInput length={6} value={value} onChange={setValue} />;
  },
};
