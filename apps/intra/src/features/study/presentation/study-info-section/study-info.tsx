import { cn } from '@hiarc-platform/ui';
import { CategoryText } from './category-text';

export function StudyInfo(): React.ReactElement {
  return (
    <div className={cn('grid grid-cols-1 grid-rows-6 gap-4', 'md:grid-cols-3 md:grid-rows-2')}>
      <CategoryText category={'진행 학기'} content={'내용1'} />
      <CategoryText category={'진행 일시'} content={'내용2'} />
      <CategoryText category={'참여 인원'} content={'내용3'} />
      <CategoryText category={'스터디장'} content={'내용4'} />
      <CategoryText category={'진행 방식'} content={'내용5'} />
      <CategoryText category={'언어'} content={'내용6'} />
    </div>
  );
}
