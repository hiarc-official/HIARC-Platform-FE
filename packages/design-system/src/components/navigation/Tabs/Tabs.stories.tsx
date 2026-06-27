import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Design System/Navigation/Tabs',
  parameters: { docs: { description: { component: '탭 네비게이션. 활성 탭을 표시하고 클릭으로 전환합니다.' } } },
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const tabs = [
      { label: '전체', value: 'all' },
      { label: '진행중', value: 'ongoing' },
      { label: '종료', value: 'closed' },
    ];
    const [active, setActive] = useState('all');
    return <Tabs tabs={tabs} activeTab={active} onTabClick={setActive} />;
  },
};
