'use client';
import { Title } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@hiarc-platform/ui';
import { Study, StudyTableSection } from '@/features/study/components/study-table-section';

const studyData: Study[] = [
  {
    studyName: '알고리즘 스터디',
    category: 'onGoing',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 1,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'onGoing',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 2,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'recruiting',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 3,
  },
  {
    studyName: '알고리즘 스터디',
    category: 'finished',
    semester: '2025-1',
    studyHead: '피카츄',
    date: '2025.10.01',
    number: 1,
  },
];

export default function StudyPage(): React.ReactElement {
  const router = useRouter();
  return (
    <PageLayout>
      <div className="flex justify-between ">
        <Title size="sm" weight="bold">
          스터디
        </Title>
        <Button size="md" className="w-[100px]" onClick={() => router.push('/study/information')}>
          개설하기
        </Button>
      </div>

      <StudyTableSection className="mt-6" studyData={studyData} />
    </PageLayout>
  );
}
