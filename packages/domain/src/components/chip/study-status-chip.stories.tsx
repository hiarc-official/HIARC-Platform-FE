import type { Meta, StoryObj } from '@storybook/react';
import { StudyStatusChip } from './study-status-chip';

const STATUSES = ['PREPARING', 'PRE_OPEN', 'RECRUITING', 'IN_PROGRESS', 'CLOSED', 'ENROLLED'] as const;

const meta = {
  title: 'Domain/Chip/StudyStatusChip',
  component: StudyStatusChip,
  tags: ['autodocs'],
  argTypes: { status: { control: 'select', options: STATUSES } },
} satisfies Meta<typeof StudyStatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { status: 'RECRUITING' } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((s) => (
        <StudyStatusChip key={s} status={s} />
      ))}
    </div>
  ),
};
