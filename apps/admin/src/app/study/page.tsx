'use client';
import { Title } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@hiarc-platform/ui';
import { Study, StudyTable } from '@/features/study/components/study-table';
import { studyData } from 'constants/mock';

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

      <StudyTable className="mt-6" studyData={studyData} />
    </PageLayout>
  );
}
