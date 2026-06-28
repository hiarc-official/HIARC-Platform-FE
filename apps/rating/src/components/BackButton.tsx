'use client';

import { useRouter } from 'next/navigation';
import { BackButton as DSBackButton } from '@hiarc-platform/design-system';

// 상세 페이지 상단의 "← 뒤로가기" (데스크탑) — intra와 동일한 DS BackButton 사용.
// 모바일은 모바일 헤더의 뒤로가기를 사용하므로 lg 이상에서만 표시.
export default function BackButton(): React.ReactElement {
  const router = useRouter();
  return <DSBackButton onClick={() => router.back()} className="hidden lg:flex" />;
}
