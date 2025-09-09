import { Study } from '@hiarc-platform/shared';
import { Button } from '@hiarc-platform/ui';

interface MobileStudyButtonProps {
  isAdmin?: boolean;
  studyData?: Study | null;

  onApplyClick?(): void;
}

export function MobileStudyButton({
  isAdmin = false,
  studyData,
  onApplyClick,
}: MobileStudyButtonProps): React.ReactElement {
  const hasRecruitmentDates = studyData?.recruitmentStartDate && studyData?.recruitmentEndDate;

  const isRecruitmentOpen = (): boolean => {
    if (
      !hasRecruitmentDates ||
      !studyData?.recruitmentStartDate ||
      !studyData?.recruitmentEndDate
    ) {
      return false;
    }
    const now = new Date();
    const startDate = new Date(studyData.recruitmentStartDate);
    const endDate = new Date(studyData.recruitmentEndDate);

    const [nowDateStr] = now.toISOString().split('T');
    const [startDateStr] = startDate.toISOString().split('T');
    const [endDateStr] = endDate.toISOString().split('T');

    return nowDateStr >= startDateStr && nowDateStr <= endDateStr;
  };

  const getDaysRemaining = (): number => {
    if (!studyData?.recruitmentEndDate) {
      return 0;
    }
    const now = new Date();
    const endDate = new Date(studyData.recruitmentEndDate);

    const [nowDateStr] = now.toISOString().split('T');
    const [endDateStr] = endDate.toISOString().split('T');

    const nowTime = new Date(nowDateStr).getTime();
    const endTime = new Date(endDateStr).getTime();
    const diffTime = endTime - nowTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
      {hasRecruitmentDates &&
        !isAdmin &&
        !studyData?.isStudent &&
        !studyData?.isInstructor &&
        (isRecruitmentOpen() ? (
          <Button size="lg" className="w-full" variant="fill" onClick={onApplyClick}>
            D-{getDaysRemaining()} 신청하기
          </Button>
        ) : (
          <Button size="lg" className="w-full" variant="line" disabled>
            모집 종료
          </Button>
        ))}

      {studyData?.isStudent && (
        <Button size="lg" className="w-full" variant="line" disabled>
          신청완료
        </Button>
      )}
    </div>
  );
}
