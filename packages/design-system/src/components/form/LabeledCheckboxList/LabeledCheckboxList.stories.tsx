import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledCheckboxList } from './LabeledCheckboxList';

const ITEMS = [
  { value: 'mon', label: '월' },
  { value: 'wed', label: '수' },
  { value: 'fri', label: '금' },
];

const meta = {
  title: 'Design System/Form/LabeledCheckboxList',
  parameters: { docs: { description: { component: '라벨·부제목이 있는 체크박스 목록.' } } },
  component: LabeledCheckboxList,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
} satisfies Meta<typeof LabeledCheckboxList>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['mon']);
    return (
      <LabeledCheckboxList
        label="요일"
        subtitle="복수 선택 가능"
        multiple
        items={ITEMS}
        selectedValues={values}
        onSelectionChange={setValues}
      />
    );
  },
};
