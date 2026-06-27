import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// 디자인 토큰 쇼케이스. 색상/타이포/radius 토큰은 루트 tailwind.config.js 프리셋에서 온다.
const meta = {
  title: 'Design System/Foundations',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Swatch({ name, className }: { name: string; className: string }): ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-14 w-full rounded-md border border-gray-200 ${className}`} />
      <span className="text-xs text-gray-700">{name}</span>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-lg font-bold">Primary</h3>
        <div className="grid grid-cols-4 gap-3">
          <Swatch name="primary" className="bg-primary" />
          <Swatch name="primary-100" className="bg-primary-100" />
          <Swatch name="primary-200" className="bg-primary-200" />
          <Swatch name="primary-300" className="bg-primary-300" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">Gray</h3>
        <div className="grid grid-cols-5 gap-3">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
            <Swatch key={n} name={`gray-${n}`} className={`bg-gray-${n}`} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">Category</h3>
        <div className="grid grid-cols-4 gap-3">
          {['rating', 'study', 'general', 'external', 'participating', 'recruiting', 'etc'].map(
            (c) => (
              <Swatch key={c} name={`category-${c}`} className={`bg-category-${c}`} />
            )
          )}
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((s) => (
        <div key={s} className={`text-${s}`}>
          text-{s} — 다람쥐 헌 쳇바퀴에 타고파 The quick brown fox
        </div>
      ))}
    </div>
  ),
};

// 동적 `rounded-${r}` 는 Tailwind 스캐너가 못 잡으므로 정적 리터럴로 나열한다.
const RADII = [
  { name: 'rounded-xs', cls: 'rounded-xs' },
  { name: 'rounded-sm', cls: 'rounded-sm' },
  { name: 'rounded-md', cls: 'rounded-md' },
  { name: 'rounded-lg', cls: 'rounded-lg' },
  { name: 'rounded-xl', cls: 'rounded-xl' },
  { name: 'rounded-2xl', cls: 'rounded-2xl' },
  { name: 'rounded-full', cls: 'rounded-full' },
];

export const Radius: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {RADII.map((r) => (
        <div key={r.name} className="flex flex-col items-center gap-1">
          <div className={`h-16 w-16 bg-primary-100 ${r.cls}`} />
          <span className="text-xs text-gray-700">{r.name}</span>
        </div>
      ))}
    </div>
  ),
};
