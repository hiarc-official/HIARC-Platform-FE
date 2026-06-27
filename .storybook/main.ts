import { join, dirname } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // 스토리는 두 패키지의 컴포넌트 옆(*.stories.tsx)에 co-locate 한다.
  stories: [
    '../packages/design-system/src/**/*.mdx',
    '../packages/design-system/src/**/*.stories.@(ts|tsx)',
    '../packages/domain/src/**/*.mdx',
    '../packages/domain/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  core: { disableTelemetry: true },
  async viteFinal(viteConfig) {
    const here = dirname(new URL(import.meta.url).pathname); // <root>/.storybook
    const shims = join(here, 'next-shims');
    const pkg = (p: string): string => join(here, '..', 'packages', p, 'src', 'index.ts');
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      // Next 런타임이 없으므로 next/* 를 Storybook 용 shim 으로 치환
      'next/image': join(shims, 'image.tsx'),
      'next/navigation': join(shims, 'navigation.ts'),
      // 워크스페이스 패키지는 빌드된 dist 가 아니라 소스로 해석 (앱의 tsconfig paths 와 동일)
      '@hiarc-platform/design-system': pkg('design-system'),
      '@hiarc-platform/domain': pkg('domain'),
      '@hiarc-platform/shared': pkg('shared'),
    };
    return viteConfig;
  },
};

export default config;
