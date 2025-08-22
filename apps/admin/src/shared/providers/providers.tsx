'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';

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
            retry: (failureCount, error: any) => {
              // 403, 401 에러면 재시도하지 않음
              if (error?.response?.status === 403 || error?.response?.status === 401) {
                return false;
              }
              // 다른 에러는 최대 3번까지 재시도
              return failureCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            retry: (failureCount, error: any) => {
              // 403, 401 에러면 재시도하지 않음
              if (error?.response?.status === 403 || error?.response?.status === 401) {
                return false;
              }
              // 다른 에러는 재시도하지 않음 (mutation은 보통 재시도하지 않음)
              return false;
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
