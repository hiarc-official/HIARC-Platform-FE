import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

const meta = {
  title: 'Design System/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>스터디 모집</CardTitle>
        <CardDescription>알고리즘 스터디 9기 모집 중</CardDescription>
      </CardHeader>
      <CardContent>매주 화요일 저녁, 백준 골드 목표로 함께 풀어요.</CardContent>
      <CardFooter>
        <Button size="sm">신청하기</Button>
      </CardFooter>
    </Card>
  ),
};
