import { mainApi } from '../../api/main';
import { format, startOfWeek, addDays } from 'date-fns';
import { HiarcScheduleSectionClient } from './client-schedule-section';
import { CalendarSchedule } from '../../types/model/calendar-schedule';

interface ServerScheduleSectionProps {
  daysToShow?: number;
  className?: string;
}

export async function ServerScheduleSection({
  daysToShow = 7,
  className,
}: ServerScheduleSectionProps): Promise<React.ReactElement> {
  // 서버에서 초기 데이터 페칭
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const medianIndex = Math.floor(daysToShow / 2);
  const medianDay = addDays(currentWeekStart, medianIndex);
  const medianDate = format(medianDay, 'yyyy-MM-dd');

  let initialData: CalendarSchedule[] = [];

  try {
    initialData = await mainApi.CALENDAR_SCHEDULE({
      median: medianDate,
      range: daysToShow,
    });
  } catch (error) {
    console.error('Failed to fetch initial calendar data:', error);
  }

  return (
    <HiarcScheduleSectionClient
      daysToShow={daysToShow}
      className={className}
      initialData={initialData}
      initialWeekStart={currentWeekStart}
      initialSelectedDate={format(new Date(), 'yyyy-MM-dd')}
    />
  );
}
