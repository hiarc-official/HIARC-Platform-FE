import { cn, Divider, Title } from '@hiarc-platform/ui';
import { useMemo, useState, useCallback } from 'react';
import { addDays, startOfWeek, format } from 'date-fns';
import CalendarBar from './calendar-bar';
import { ScheduleListItem } from './schedule-list-item';
import { useCalendarSchedule } from '../../hooks/use-calendar-schedule';

interface HiarcScheduleSectionProps {
  daysToShow?: number;
  className?: string;
}

export function HiarcScheduleSection({
  daysToShow = 7,
  className,
}: HiarcScheduleSectionProps): React.ReactElement {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    () => startOfWeek(new Date(), { weekStartsOn: 0 }) // 일요일 시작
  );

  // 현재 주의 수요일 계산 (median으로 사용)
  const medianDate = useMemo(() => {
    const wednesday = addDays(currentWeekStart, 3); // 일요일부터 3일 후 = 수요일
    return format(wednesday, 'yyyy-MM-dd');
  }, [currentWeekStart]);

  const { data: calendarSchedules, isLoading } = useCalendarSchedule({
    median: medianDate,
    range: daysToShow,
  });

  // 캘린더 데이터 변환 (API 데이터 -> CalendarBar 형식)
  const calendarData = useMemo(() => {
    if (!calendarSchedules) {
      return [];
    }

    return calendarSchedules.map((schedule) => {
      const date = schedule.date ? format(schedule.date, 'yyyy-MM-dd') : '';
      const categories = schedule.schedules
        ? Array.from(
            new Set(
              schedule.schedules
                .map((s) => s.announcementType?.toLowerCase())
                .filter((type): type is string => Boolean(type))
            )
          )
        : [];

      return { date, categories };
    });
  }, [calendarSchedules]);

  // 선택된 날짜의 일정들
  const selectedSchedules = useMemo(() => {
    if (!calendarSchedules) {
      return [];
    }

    const selectedScheduleData = calendarSchedules.find(
      (schedule) => schedule.date && format(schedule.date, 'yyyy-MM-dd') === selectedDate
    );

    return selectedScheduleData?.schedules || [];
  }, [calendarSchedules, selectedDate]);

  // 날짜 선택 핸들러
  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  // 주 변경 핸들러
  const handleWeekChange = useCallback((newWeekStart: Date) => {
    setCurrentWeekStart(newWeekStart);
    // 새로운 주로 변경될 때 첫 번째 날짜를 선택
    setSelectedDate(format(newWeekStart, 'yyyy-MM-dd'));
  }, []);

  if (isLoading) {
    return (
      <section className={cn('w-full', className)}>
        <Title size="sm" weight="bold" className="mb-2">
          학회일정
        </Title>
        <div className="p-4 text-center text-gray-500">로딩중...</div>
      </section>
    );
  }

  return (
    <section className={cn('w-full', className)}>
      <Title size="sm" weight="bold" className="mb-2">
        학회일정
      </Title>
      <Divider variant="horizontal" size="full" className="mt-4" />
      <div className="flex max-h-[350px] flex-col gap-2 overflow-y-auto">
        <CalendarBar
          data={calendarData}
          daysToShow={daysToShow}
          className="mb-7 mt-4"
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
          onWeekChange={handleWeekChange}
          currentWeekStart={currentWeekStart}
        />

        {selectedSchedules.length > 0 ? (
          selectedSchedules.map((schedule, index) => (
            <ScheduleListItem
              key={index}
              title={schedule.scheduleTitle || '제목 없음'}
              category={schedule.announcementType || 'GENERAL'}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">선택한 날짜에 일정이 없습니다.</div>
        )}
      </div>
    </section>
  );
}
