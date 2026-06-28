import type { Meta, StoryObj } from '@storybook/react';
import { ICONS, Icon, type IconName } from './index';

// shared-assets SVG 를 인라인 React 컴포넌트로 변환한 아이콘팩.
const meta = {
  title: 'Design System/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '`/shared-assets/*.svg` 를 인라인 SVG React 컴포넌트로 변환한 아이콘팩입니다. 파일을 fetch 하지 않으므로 Storybook 등 정적 환경에서도 깨지지 않습니다. `<XIcon />` 개별 import 또는 `<Icon name="X" />` 로 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const names = Object.keys(ICONS) as IconName[];

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
      {names.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 text-center"
        >
          <div className="flex h-8 w-8 items-center justify-center">
            <Icon name={name} className="max-h-8 max-w-8" />
          </div>
          <span className="text-xs text-gray-700">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const UsageWithIconComponent: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="User" className="h-6 w-6" />
      <Icon name="Home" className="h-6 w-6" />
      <Icon name="Mail" className="h-6 w-6" />
      <Icon name="Edit" className="h-6 w-6" />
      <Icon name="Delete" className="h-6 w-6" />
    </div>
  ),
};
