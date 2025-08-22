'use client';

import { DialogUtil } from '@hiarc-platform/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

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
            onError: (error: Error) => {
              DialogUtil.hideAllDialogs();
              DialogUtil.showServerError(error, '서버 오류가 발생했습니다.');
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
