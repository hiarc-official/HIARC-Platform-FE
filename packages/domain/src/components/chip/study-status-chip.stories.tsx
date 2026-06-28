import type { Meta, StoryObj } from '@storybook/react';
import { StudyStatusChip } from './study-status-chip';

const STATUSES = ['PREPARING', 'PRE_OPEN', 'RECRUITING', 'IN_PROGRESS', 'CLOSED', 'ENROLLED'] as const;

const meta = {
  title: 'Domain/Chip/StudyStatusChip',
  parameters: { docs: { description: { component: '스터디 상태(준비중/모집중/진행중/종료 등)를 표시하는 칩.' } } },
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
