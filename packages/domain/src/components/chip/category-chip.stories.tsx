import type { Meta, StoryObj } from '@storybook/react';
import { CategoryChip } from './category-chip';

const CATEGORIES = [
  'RATING',
  'STUDY',
  'ETC',
  'GENERAL',
  'EXTERNAL',
  'PARTICIPATING',
  'RECRUITING',
  'ONGOING',
  'FINISHED',
] as const;

const meta = {
  title: 'Domain/Chip/CategoryChip',
  parameters: { docs: { description: { component: '공지 카테고리(하이팅/스터디/외부 등)를 색으로 구분해 표시하는 칩.' } } },
  component: CategoryChip,
  tags: ['autodocs'],
  argTypes: { category: { control: 'select', options: CATEGORIES } },
} satisfies Meta<typeof CategoryChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { category: 'STUDY' } };

export const AllCategories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => (
        <CategoryChip key={c} category={c} />
      ))}
    </div>
  ),
};
