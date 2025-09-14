'use client';

import { cn } from '@hiarc-platform/ui';
import { addDays, differenceInDays, format, getDay } from 'date-fns';
import { useEffect, useRef } from 'react';

const daysInWeek = 7;
const boxSize = 8;
const boxGap = 2.5;
const monthLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

interface StreakData {
  date?: string | null;
  value?: boolean | null;
}

interface Props {
  data: StreakData[];
}

const getColor = (hasStreak: boolean): string => (hasStreak ? 'bg-primary-100/50' : 'bg-gray-100');

export function ContributionGrid({ data }: Props): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const yearStart = addDays(today, -365); // 365일 전
  const yearEnd = today; // 오늘

  const totalDaysInYear = differenceInDays(yearEnd, yearStart) + 1;
  const startDayOfWeek = getDay(yearStart);
  const totalWeeks = Math.ceil((totalDaysInYear + startDayOfWeek) / 7);

  const dateMap = new Map<string, boolean>();
  data.forEach(({ date, value }) => {
    if (date) {
      dateMap.set(date, value || false);
    }
  });

  const gridWidth = totalWeeks * boxSize + (totalWeeks - 1) * boxGap;

  const getMonthPositions = (): Array<{ month: string; left: number }> => {
    const positions: Array<{ month: string; left: number }> = [];
    const monthStarts: number[] = [];

    // 시작 월부터 현재 월까지 순회
    const currentDate = new Date(yearStart);
    currentDate.setDate(1); // 각 월의 1일로 설정

    while (currentDate <= yearEnd) {
      const daysSinceYearStart = differenceInDays(currentDate, yearStart);
      const weekPosition = Math.floor((daysSinceYearStart + startDayOfWeek) / 7);
      const left = weekPosition * (boxSize + boxGap);

      // 중복되지 않고 그리드 범위 내에 있는 경우만 추가
      if (
        daysSinceYearStart >= 0 &&
        weekPosition < totalWeeks &&
        (monthStarts.length === 0 || weekPosition > monthStarts[monthStarts.length - 1])
      ) {
        positions.push({ month: monthLabels[currentDate.getMonth()], left });
        monthStarts.push(weekPosition);
      }

      // 다음 월로 이동
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return positions;
  };

  const monthPositions = getMonthPositions();

  // 컴포넌트 마운트 시 오른쪽 끝으로 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  return (
    <div className="relative">
      <div ref={scrollRef} className="overflow-x-auto" style={{ width: '100%' }}>
        <div className="flex flex-col" style={{ minWidth: `${gridWidth}px` }}>
          {/* 월 헤더 */}
          <div className="relative mb-2 h-4" style={{ width: `${gridWidth}px` }}>
            {monthPositions.map(({ month, left }) => (
              <span
                key={month}
                className="absolute text-xs text-gray-600"
                style={{ left: `${left}px` }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* 그리드 */}
          <div
            className="inline-flex"
            style={{
              width: `${gridWidth}px`,
              gap: `${boxGap}px`,
              minWidth: `${gridWidth}px`,
            }}
          >
            {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col" style={{ gap: `${boxGap}px` }}>
                {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
                  const dayOffset = weekIndex * daysInWeek + dayIndex - startDayOfWeek;

                  if (dayOffset < 0 || dayOffset >= totalDaysInYear) {
                    return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-2 w-2" />;
                  }

                  const currentDate = addDays(yearStart, dayOffset);
                  const dateString = format(currentDate, 'yyyy-MM-dd');
                  const hasStreak = dateMap.get(dateString) || false;

                  return (
                    <div
                      key={dateString}
                      title={`${dateString}: ${hasStreak ? 'streak' : 'no streak'}`}
                      className={cn('h-2 w-2', getColor(hasStreak))}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
