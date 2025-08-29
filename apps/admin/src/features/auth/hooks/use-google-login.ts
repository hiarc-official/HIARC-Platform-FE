import { useState } from 'react';
import { authApi } from '../api/auth';
import { BrowserUtil } from '@hiarc-platform/shared';

export function useGoogleLogin(): { googleLogin(): void; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = (): void => {
    try {
      // 인앱 브라우저 체크
      if (!BrowserUtil.checkBeforeGoogleLogin()) {
        return;
      }

      setIsLoading(true);
      // 직접 리다이렉트이므로 페이지가 이동되어 setIsLoading(false)가 실행되지 않음
      authApi.GOOGLE_LOGIN();
    } catch (error) {
      console.error('Google 로그인 실패:', error);
      setIsLoading(false);
    }
  };

  return {
    googleLogin,
    isLoading,
  };
}
