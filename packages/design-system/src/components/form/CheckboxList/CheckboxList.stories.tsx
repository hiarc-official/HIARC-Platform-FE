import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckboxList } from './CheckboxList';

const ITEMS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

const meta = {
  title: 'Design System/Form/CheckboxList',
  component: CheckboxList,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
} satisfies Meta<typeof CheckboxList>;

export default meta;
type Story = StoryObj;

export const Multiple: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['react']);
    return (
      <CheckboxList multiple items={ITEMS} selectedValues={values} onSelectionChange={setValues} />
    );
  },
};

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('vue');
    return (
      <CheckboxList items={ITEMS} selectedValue={value} onSingleSelectionChange={setValue} />
    );
  },
};
