import { cn, LectureListItem } from '@hiarc-platform/ui';

interface LectureListProps {
  className?: string;
}

export function LectureList({ className }: LectureListProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <LectureListItem week={0} study={'123'} classRoom={'T0501'} isAdmin={false} />
      <LectureListItem week={0} study={'123'} classRoom={'T0501'} isAdmin={true} />
      <LectureListItem week={0} study={'123'} classRoom={'T0501'} isAdmin={true} />
      <LectureListItem week={0} study={'123'} classRoom={'T0501'} isAdmin={true} />
    </div>
  );
}
