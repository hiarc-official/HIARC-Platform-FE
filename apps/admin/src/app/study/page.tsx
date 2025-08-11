'use client';
import { Title } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@hiarc-platform/ui';
import { Study, StudyTable } from '@/features/study/components/study-table';
import { useStudies } from '@/features/study/hooks';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();
  const { data: studiesData, isLoading, error } = useStudies();

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-64 items-center justify-center">
          <div>로딩 중...</div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex h-64 items-center justify-center">
          <div>스터디 목록을 불러오는 중 오류가 발생했습니다.</div>
        </div>
      </PageLayout>
    );
  }

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

      <StudyTable className="mt-6" studyData={[]} />
    </PageLayout>
  );
}
