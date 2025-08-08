import { useState } from 'react';
import { authApi } from '../api/auth';

type OAuthProvider = 'google' | 'kakao' | 'naver';

interface UseOAuthLoginReturn {
  login(provider: OAuthProvider): void;
  isLoading: boolean;
}

export default function useOAuthLogin(): UseOAuthLoginReturn {
  const [isLoading, setIsLoading] = useState(false);

  const login = (provider: OAuthProvider): void => {
    try {
      setIsLoading(true);
      
      switch (provider) {
        case 'google':
          authApi.GOOGLE_LOGIN();
          break;
        case 'kakao':
          authApi.KAKAO_LOGIN();
          break;
        case 'naver':
          authApi.NAVER_LOGIN();
          break;
        default:
          throw new Error(`지원하지 않는 OAuth 제공자입니다: ${provider}`);
      }
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}