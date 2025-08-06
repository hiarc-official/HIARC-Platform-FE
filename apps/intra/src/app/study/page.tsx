'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { Study, StudyTable } from '@/features/study/components/study-table';
import { PageLayout, Title } from '@hiarc-platform/ui';

const studyData: Study[] = [
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 1,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 2,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 3,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'study',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 1,
  },
];

export default function StudyListPage(): React.ReactElement {
  return (
    <PageLayout>
      <Title size="sm" weight="bold">
        스터디
      </Title>
      <StudySearchSection className="mt-6" />
      <StudyTable className="mt-6" studyData={studyData} />
    </PageLayout>
  );
}
