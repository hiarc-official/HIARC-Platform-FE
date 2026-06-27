import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Design System/Action/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'fill',
        'secondary',
        'line',
        'fill_light',
        'fill_secondary',
        'line_secondary',
        'social_login',
        'unselected',
        'whitebg',
      ],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { children: '버튼' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="fill">fill</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="line">line</Button>
      <Button variant="fill_light">fill_light</Button>
      <Button variant="fill_secondary">fill_secondary</Button>
      <Button variant="line_secondary">line_secondary</Button>
      <Button variant="social_login">social_login</Button>
      <Button variant="unselected">unselected</Button>
      <Button variant="whitebg">whitebg</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button size="xl">xl</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
