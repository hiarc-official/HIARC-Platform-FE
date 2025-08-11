'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { createQueryErrorHandler, setupGlobalErrorHandler } from '../hooks/use-error-handler';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
          },
          mutations: {
            onError: createQueryErrorHandler(),
          },
        },
      })
  );

  useEffect(() => {
    // 글로벌 에러 핸들러 설정
    setupGlobalErrorHandler();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}