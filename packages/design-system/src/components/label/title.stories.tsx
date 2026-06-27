import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './title';

const meta = {
  title: 'Design System/Typography/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'lg'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
  },
  args: { children: '제목 텍스트' },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Title size="xs">xs 제목</Title>
      <Title size="sm">sm 제목</Title>
      <Title size="lg">lg 제목</Title>
    </div>
  ),
};
