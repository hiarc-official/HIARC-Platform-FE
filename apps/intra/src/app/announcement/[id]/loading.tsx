import { DetailPageSkeleton, PageLayout } from '@hiarc-platform/ui';

export default function Loading(): React.ReactElement {
  return (
    <PageLayout>
      <DetailPageSkeleton />
    </PageLayout>
  );
}
