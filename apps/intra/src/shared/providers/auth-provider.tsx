'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactNode {
  const { initialize, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize().catch((error) => {
        console.error('Auth initialization failed:', error);
        // 에러가 발생해도 렌더링은 계속 진행
      });
    }
  }, [initialize, isInitialized]);

  return children;
}
