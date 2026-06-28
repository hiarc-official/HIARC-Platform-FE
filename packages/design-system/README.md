# @hiarc-platform/design-system

서비스에 종속되지 않는 재사용 UI 프리미티브. 어느 앱(admin · intra)에서든 그대로 쓸 수 있다.

Button, IconButton, Card, Input/LabeledInput, Select, Dialog, Tabs, Popover, Table(공통), Skeleton,
Label/Title, Badge, Avatar 등. 비즈니스 도메인 지식이 들어가면 여기가 아니라
[`@hiarc-platform/domain`](../domain) 으로 가야 한다.

디자인 토큰(색상·타이포·radius·shadow)은 루트 [`tailwind.config.js`](../../tailwind.config.js) 프리셋
하나로 앱·Storybook 이 공유한다.

## Storybook

레포 루트에서 실행한다. 두 패키지의 컴포넌트를 모두 보여준다.

```bash
pnpm storybook         # dev 서버 (localhost:6006)
pnpm build-storybook   # 정적 빌드
```

- 스토리는 컴포넌트 옆 `*.stories.tsx` 에 둔다. 사이드바는 `title` 로 분류: `Design System/...`.
- 설정은 루트 [`.storybook`](../../.storybook). Next 런타임이 없으므로 `next/image`·`next/navigation`
  은 shim 으로 치환된다.
