/* eslint-disable @typescript-eslint/no-empty-function */
// Storybook 용 next/navigation 스텁. 라우팅은 no-op 으로, action 로깅은 콘솔로.
const noop = (): void => {};

export function useRouter(): {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: () => void;
} {
  return {
    push: (href) => console.log('[storybook] router.push', href),
    replace: (href) => console.log('[storybook] router.replace', href),
    back: noop,
    forward: noop,
    refresh: noop,
    prefetch: noop,
  };
}

export function usePathname(): string {
  return '/';
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function useParams(): Record<string, string> {
  return {};
}
