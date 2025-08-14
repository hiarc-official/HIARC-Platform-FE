import { Button } from '../../button';
import { Divider } from '../../divider';
import { Label } from '../../label/label';

interface LocationScheduleSectionProps {
  place?: string;
  scheduleStartAt?: Date;
  scheduleEndAt?: Date;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  applicationUrl?: string;
}

export function LocationScheduleSection({
  place,
  scheduleStartAt,
  scheduleEndAt,
  applicationStartAt,
  applicationEndAt,
  applicationUrl,
}: LocationScheduleSectionProps): React.ReactElement | null {
  if (!place && !scheduleStartAt && !scheduleEndAt && !applicationStartAt && !applicationEndAt) {
    return null;
  }

  return (
    <>
      <div className="mt-6 flex w-full gap-4">
        {place && (
          <div className="flex flex-1 items-center gap-4">
            <Label className="w-[86px] text-gray-500" size="lg" weight="bold">
              장소
            </Label>
            <Label size="lg" weight="medium">
              {place}
            </Label>
          </div>
        )}
        {scheduleStartAt && (
          <div className="flex flex-1 items-center gap-4">
            <Label className="w-[86px] text-gray-500" weight="bold">
              진행 일시
            </Label>
            <Label weight="medium">
              {scheduleStartAt
                .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/\. /g, '.')
                .replace(/\.$/, '')}{' '}
              {scheduleStartAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              {scheduleEndAt &&
                ` ~ ${scheduleEndAt.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')} ${scheduleEndAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`}
            </Label>
          </div>
        )}
        {applicationStartAt && (
          <div className="flex flex-1 items-center gap-4">
            <Label className="w-[86px] text-gray-500" weight="bold">
              신청 기한
            </Label>
            <Label weight="medium">
              {applicationStartAt
                .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/\. /g, '.')
                .replace(/\.$/, '')}
              {applicationEndAt &&
                ` ~ ${applicationEndAt.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '')}`}
            </Label>
            <Button
              size="xs"
              variant="line"
              className="border-primary-100 text-primary-100"
              onClick={() => applicationUrl && window.open(applicationUrl, '_blank')}
            >
              신청하기
            </Button>
          </div>
        )}
      </div>
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-200" />
    </>
  );
}
