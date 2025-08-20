import { cn, StudyCard, Title } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useStudiesNow } from '../../hooks/use-studies-now';

interface StudyListSectionProps {
  className?: string;
}

export function StudyListSection({ className }: StudyListSectionProps): React.ReactElement {
  const router = useRouter();
  const { data: studyList } = useStudiesNow();

  return (
    <div className={cn('flex w-full flex-col justify-center', className)}>
      <section className="">
        <div className="flex w-full justify-between">
          <Title size="sm" weight="bold">
            스터디목록
          </Title>
          <button
            onClick={() => {
              router.push('/study');
            }}
          >
            {'더보기 ->'}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {studyList?.map((study) => (
            <StudyCard
              key={study.studyId}
              studyId={study.studyId ?? 0}
              delivery={study.isOnline ? '비대면' : '대면'}
              studyTitle={study.studyName ?? ''}
              hostName={study.instructorName ?? ''}
              startDate={
                study.startDate ? study.startDate.toISOString().slice(0, 10).replace(/-/g, '.') : ''
              }
              endDate={
                study.endDate ? study.endDate.toISOString().slice(0, 10).replace(/-/g, '.') : ''
              }
              studyDescription={study.introduction ?? ''}
              state={study.activeStatus ?? 'CLOSED'}
              time={study.studyTime ?? ''}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
