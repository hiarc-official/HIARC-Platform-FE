'use client';

import { LoadingDots } from '@hiarc-platform/ui';
import useOAuthCallback from '../../../features/auth/hooks/use-oauth-callback';

export default function OAuthCallbackPage(): React.ReactElement {
  const { isProcessing } = useOAuthCallback();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingDots />
        <div>{isProcessing ? '로그인 처리 중...' : '완료'}</div>
      </div>
    </div>
  );
}
