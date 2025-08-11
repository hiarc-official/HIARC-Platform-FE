import { cn } from '@hiarc-platform/ui';
import { CategoryText } from './category-text';
import type { Study } from '@/features/study/types';

interface StudyInfoProps {
  studyData?: Study;
}

export function StudyInfo({ studyData }: StudyInfoProps): React.ReactElement {
  return (
    <div className={cn('grid grid-cols-1 grid-rows-6 gap-4', 'md:grid-cols-3 md:grid-rows-2')}>
      <CategoryText 
        category={'진행 학기'} 
        content={studyData ? `${Math.floor(studyData.semesterId / 10)}년 ${studyData.semesterId % 10}학기` : '내용1'} 
      />
      <CategoryText 
        category={'진행 일시'} 
        content={studyData ? `${studyData.startDate} - ${studyData.endDate}` : '내용2'} 
      />
      <CategoryText 
        category={'참여 인원'} 
        content={studyData ? `${studyData.currentParticipants}/${studyData.capacity}명` : '내용3'} 
      />
      <CategoryText 
        category={'스터디장'} 
        content={studyData?.mentorName || '미지정'} 
      />
      <CategoryText 
        category={'난이도'} 
        content={studyData?.difficulty === 'BEGINNER' ? '초급' : 
                 studyData?.difficulty === 'INTERMEDIATE' ? '중급' : 
                 studyData?.difficulty === 'ADVANCED' ? '고급' : '내용5'} 
      />
      <CategoryText 
        category={'카테고리'} 
        content={studyData?.category || '내용6'} 
      />
    </div>
  );
}
