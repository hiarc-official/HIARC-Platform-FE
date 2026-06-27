import type { Meta, StoryObj } from '@storybook/react';
import { RatingChip } from './rating-chip';

const SAMPLE = [
  'UNRATED',
  'BRONZE_3',
  'SILVER_3',
  'GOLD_3',
  'PLATINUM_3',
  'DIAMOND_3',
  'RUBY_3',
  'DIV_1',
] as const;

const meta = {
  title: 'Domain/Chip/RatingChip',
  component: RatingChip,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: 'select',
      options: ['UNRATED', 'BRONZE_1', 'SILVER_1', 'GOLD_1', 'PLATINUM_1', 'DIAMOND_1', 'RUBY_1'],
    },
  },
} satisfies Meta<typeof RatingChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { rating: 'GOLD_3' } };

export const Tiers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {SAMPLE.map((r) => (
        <RatingChip key={r} rating={r} />
      ))}
    </div>
  ),
};
