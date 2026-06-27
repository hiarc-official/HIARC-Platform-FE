import type { Meta, StoryObj } from '@storybook/react';
import { StudyCard } from './study-card';

const meta = {
  title: 'Domain/Study/StudyCard',
  component: StudyCard,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '스터디 요약 카드. 일정·진행방식·상태·설명을 담습니다.' } }, layout: 'padded' },
  args: {
    studyId: 1,
    time: '매주 화 19:00',
    delivery: '온라인',
    studyTitle: '알고리즘 스터디 9기',
    hostName: '홍길동',
    startDate: '2026.03.01',
    endDate: '2026.06.30',
    studyDescription: '백준 골드 목표로 매주 함께 문제를 풀고 코드 리뷰를 진행합니다.',
    state: 'RECRUITING',
    isEnrolled: false,
  },
  decorators: [(Story) => <div className="w-[480px]">{Story()}</div>],
} satisfies Meta<typeof StudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {};

export const Enrolled: Story = {
  args: { isEnrolled: true },
};

export const Closed: Story = {
  args: { state: 'CLOSED' },
};
