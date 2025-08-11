import { Button, CategoryChip, Label, Title } from '@hiarc-platform/ui';
import type { Study } from '@/features/study/types';

interface StudyTitleProps {
  studyData?: Study;
}

export function StudyTitle({ studyData }: StudyTitleProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        {/* 왼쪽: 스터디 정보 */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Title size="sm" weight="bold">
              {studyData?.title || '스터디명'}
            </Title>
            <CategoryChip category={
              studyData?.status === 'RECRUITING' ? 'recruiting' : 
              studyData?.status === 'IN_PROGRESS' ? 'participating' : 'finished'
            } />
          </div>
          <Label>{studyData?.description || '스터디 관련 소개글'}</Label>

          {/* 모집일/날짜 (모바일에서만) */}
          <div className="mt-3 flex items-center md:hidden">
            <Label size="lg" className="text-gray-500">
              진행 기간
            </Label>
            <Label size="lg" weight="medium" className="ml-4 text-gray-900">
              {studyData ? `${studyData.startDate} - ${studyData.endDate}` : '25.02.22 - 25.02.28'}
            </Label>
          </div>
        </div>

        {/* 모집일/날짜/버튼 (데스크탑에서만) */}
        <div className="hidden flex-shrink-0 items-center md:ml-6 md:flex">
          <Button size="md" className="ml-6" variant="line">
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
