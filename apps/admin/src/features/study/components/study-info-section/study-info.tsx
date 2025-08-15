import { cn } from '@hiarc-platform/ui';
import { CategoryText } from './category-text';
import { Study } from '@hiarc-platform/shared';

interface StudyInfoProps {
  studyData?: Study | null;
}

export function StudyInfo({ studyData }: StudyInfoProps): React.ReactElement {
  return (
    <div className={cn('grid grid-cols-1 grid-rows-6 gap-4', 'md:grid-cols-3 md:grid-rows-2')}>
      <CategoryText
        category={'진행 학기'}
        content={studyData ? `${studyData.semesterYear}년 ${studyData.semesterType}학기` : '내용1'}
      />
      <CategoryText
        category={'진행 일시'}
        content={studyData ? `${studyData.startTime}` : '내용2'}
      />
      <CategoryText
        category={'참여 인원'}
        content={
          studyData ? `${studyData.currentParticipants}/${studyData.maxParticipants}명` : '내용3'
        }
      />
      <CategoryText category={'스터디장'} content={studyData?.instructorName || '미지정'} />
      <CategoryText
        category={'진행방식'}
        content={
          studyData?.studyType === 'ONLINE'
            ? '온라인'
            : studyData?.studyType === 'OFFLINE'
              ? '오프라인'
              : '온라인'
        }
      />
      <CategoryText category={'언어'} content={studyData?.language || '내용6'} />
    </div>
  );
}
