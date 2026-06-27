import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledSelectButton } from './LabeledSelectButton';

const OPTIONS = [
  { value: 'low', label: '하' },
  { value: 'mid', label: '중' },
  { value: 'high', label: '상' },
];

const meta = {
  title: 'Design System/Form/LabeledSelectButton',
  parameters: { docs: { description: { component: '버튼형 단일 선택. 옵션을 버튼 그룹으로 노출합니다.' } } },
  component: LabeledSelectButton,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof LabeledSelectButton>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('mid');
    return <LabeledSelectButton label="난이도" options={OPTIONS} value={value} onChange={setValue} />;
  },
};
