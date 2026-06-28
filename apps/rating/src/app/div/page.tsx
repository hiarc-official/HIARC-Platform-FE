import { Suspense } from 'react';
import RankingPage from '@/page/RankingPage';

export default function Page(): React.ReactElement {
  return (
    <Suspense>
      <RankingPage />
    </Suspense>
  );
}
