import type { Meta, StoryObj } from '@storybook/react';
import { LazyCSS } from './LazyCSS';

// 외부 CSS 파일을 지연 로드하는 유틸 컴포넌트 (자체 시각 요소 없음).
const meta = {
  title: 'Design System/Utility/LazyCSS',
  parameters: { docs: { description: { component: '외부 CSS 파일을 지연 로드하는 유틸(시각 요소 없음).' } } },
  component: LazyCSS,
  tags: ['autodocs'],
} satisfies Meta<typeof LazyCSS>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="text-sm text-gray-600">
      <LazyCSS href="/example.css" id="example" />
      href 로 지정한 스타일시트를 비동기로 주입합니다. 화면에는 아무것도 렌더하지 않습니다.
    </div>
  ),
};
