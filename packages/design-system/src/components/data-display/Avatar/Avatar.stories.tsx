import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Design System/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: '사용자 아바타. 이미지가 없거나 로드 실패 시 기본 사용자 아이콘으로 폴백합니다.' } }, layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: { imageUrl: 'https://i.pravatar.cc/80', alt: '사용자' },
};

export const Fallback: Story = {
  args: { alt: '이미지 없음' },
};
