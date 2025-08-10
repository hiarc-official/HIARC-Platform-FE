'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { StudyTable } from '@/features/study/components/study-table';
import useStudies from '@/features/study/hooks/use-studies';
import { PageLayout, Title } from '@hiarc-platform/ui';

export default function StudyListPage(): React.ReactElement {
  const { data: studies, isLoading, error } = useStudies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>스터디 목록을 불러올 수 없습니다.</div>;
  }
  return (
    <PageLayout>
      <Title size="sm" weight="bold">
        스터디
      </Title>
      <StudySearchSection className="mt-6" />
      <StudyTable className="mt-6" studyData={studies?.content || []} />
    </PageLayout>
  );
}
