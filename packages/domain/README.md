# @hiarc-platform/domain

HIARC 서비스 도메인(공지·스터디 등)에 특화된 조합형 컴포넌트.
[`@hiarc-platform/design-system`](../design-system) 의 프리미티브를 조합해 만든다.

Announcement\*(공지), Study\*(스터디·출석·과제), CategoryChip · RatingChip · StudyStatusChip,
MobileHeader, AttendanceTable 등. 도메인 지식(스터디 상태, 출석, 공지 카테고리 등)을 담고 있으므로
design-system 과 별도로 관리한다.

의존 방향은 **domain → design-system** 단방향이다 (역방향 금지).

스토리는 컴포넌트 옆 `*.stories.tsx` 에 두고 `title` 을 `Domain/...` 으로 분류한다. Storybook 실행은
레포 루트에서 `pnpm storybook` (자세한 내용은 design-system README 참고).
