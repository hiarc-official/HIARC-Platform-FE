import { DateUtil } from '@hiarc-platform/shared';
import { Divider } from '../../divider';
import { Label } from '../../label/label';
import { ApplicationButton } from './application-button';

interface LocationScheduleSectionProps {
  place?: string;
  scheduleStartAt?: Date;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  applicationUrl?: string;
  memberRole?: string | null;
}

function isApplicationPeriodActive(startDate: Date, endDate: Date): boolean {
  const today = new Date();
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDateOnly = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return todayDateOnly >= startDateOnly && todayDateOnly <= endDateOnly;
}

export function LocationScheduleSection({
  place,
  scheduleStartAt,
  applicationStartAt,
  applicationEndAt,
  applicationUrl,
  memberRole,
}: LocationScheduleSectionProps): React.ReactElement | null {
  return (
    <>
      <div className="mt-6 flex w-full flex-col gap-4 md:flex-row">
        <div className="flex flex-1 items-center gap-4">
          <Label className="w-[86px] text-gray-500" weight="bold">
            장소
          </Label>
          <Label weight="medium">{place ? place : '-'}</Label>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <Label className="w-[86px] text-gray-500" weight="bold">
            진행 일시
          </Label>
          <Label weight="medium">
            {scheduleStartAt ? DateUtil.formatDateTimeWithDots(scheduleStartAt) : '-'}
          </Label>
        </div>
        {applicationStartAt && applicationEndAt && (
          <div className="flex flex-1 items-center gap-4">
            <Label className="w-[86px] text-gray-500" weight="bold">
              신청 기한
            </Label>
            <div className="flex flex-1 items-center gap-2">
              <Label weight="medium" className="min-w-0 flex-1 truncate">
                {DateUtil.formatDateWithDots(applicationStartAt)}
                {applicationEndAt && ` ~ ${DateUtil.formatDateWithDots(applicationEndAt)}`}
              </Label>
              <ApplicationButton
                applicationUrl={applicationUrl}
                isDisabled={
                  !applicationUrl ||
                  !isApplicationPeriodActive(applicationStartAt, applicationEndAt) ||
                  memberRole === 'GUEST' ||
                  memberRole === 'ASSOCIATE' ||
                  memberRole === null
                }
              />
            </div>
          </div>
        )}
      </div>
      <Divider variant="horizontal" size="full" className="mt-6 hidden bg-gray-200 md:block" />
    </>
  );
}
