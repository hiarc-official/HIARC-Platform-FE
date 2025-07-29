'use client';

import { cn, Label } from '@hiarc-platform/ui';
import IconButton from '@hiarc-platform/ui/src/components/icon-button';
import { addDays, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo, useState } from 'react';

// 카테고리별 점 색상 정의 (원하는 대로 추가/수정)
const CATEGORY_COLORS: Record<string, string> = {
  rating: 'bg-category-rating',
  study: 'bg-category-study',
  general: 'bg-category-general',
  etc: 'bg-category-etc',
  external: 'bg-category-external',
};

interface DataItem {
  date: string;
  categories: string[];
}

interface Props {
  data: DataItem[];
  daysToShow: number; // 3 또는 7
  className?: string; // 추가: 클래스 이름을 받을 수 있도록
}

function getDateRange(startDate: Date, days: number): Date[] {
  return Array.from({ length: days }, (_, i) => addDays(startDate, i));
}

function getStartOfWeekWithSunday(date: Date): Date {
  // 일요일 시작
  return startOfWeek(date, { weekStartsOn: 0 });
}

export default function CalendarBar({ data, daysToShow, className }: Props): React.ReactElement {
  const [currentStartDate, setCurrentStartDate] = useState<Date>(
    daysToShow === 7 ? getStartOfWeekWithSunday(new Date()) : new Date()
  );
  const today = new Date();

  // "오늘"을 기본 선택
  const [selectedDate, setSelectedDate] = useState<string>(format(today, 'yyyy-MM-dd'));

  const dates = getDateRange(currentStartDate, daysToShow);

  // 날짜별 데이터 맵핑
  const dataMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    data.forEach((item) => {
      map[item.date] = item.categories;
    });
    return map;
  }, [data]);

  // 날짜 이동
  const move = (dir: 'prev' | 'next'): void => {
    setCurrentStartDate((prev) => {
      const next = addDays(prev, (dir === 'next' ? 1 : -1) * daysToShow);
      const newDates = getDateRange(next, daysToShow);
      if (!newDates.some((day) => format(day, 'yyyy-MM-dd') === selectedDate)) {
        setSelectedDate(format(newDates[0], 'yyyy-MM-dd'));
      }
      return next;
    });
  };

  return (
    <div className={cn('flex w-full flex-col items-center gap-2', className)}>
      <div className="flex w-full items-center gap-2">
        <IconButton iconSrc="/Left.svg" onClick={() => move('prev')} />
        <div className="flex flex-1 overflow-hidden">
          {dates.map((date) => {
            const ymd = format(date, 'yyyy-MM-dd');
            const dayLabel = format(date, 'MM.dd(E)', { locale: ko });
            const cats = dataMap[ymd] || [];
            const isSelected = selectedDate === ymd;

            return (
              <div
                key={ymd}
                className={cn(
                  'flex min-w-0 flex-1 cursor-pointer flex-col items-center',
                  'justify-center px-1 py-1',
                  'transition-all hover:bg-gray-50',
                  'rounded-md border',
                  {
                    'border-primary-300 font-bold text-blue-900': isSelected,
                    'border-transparent': !isSelected,
                  }
                )}
                onClick={() => setSelectedDate(ymd)}
              >
                <Label className="text-gray-700">{dayLabel}</Label>
                <div className="mt-1 flex h-7 items-center justify-center gap-0.5">
                  {cats.map((cat, idx) => (
                    <span
                      key={cat + idx}
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        CATEGORY_COLORS[cat] || 'bg-gray-300'
                      )}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <IconButton iconSrc="/Right.svg" onClick={() => move('next')} />
      </div>
    </div>
  );
}
