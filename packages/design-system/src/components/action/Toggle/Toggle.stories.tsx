import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Design System/Action/Toggle',
  parameters: { docs: { description: { component: '눌림 상태를 토글하는 단일 버튼. on/off 상태를 가집니다.' } } },
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
  },
  args: { children: 'B' },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3">
      <Toggle variant="default">기본</Toggle>
      <Toggle variant="outline">아웃라인</Toggle>
      <Toggle defaultPressed>켜짐</Toggle>
    </div>
  ),
};
