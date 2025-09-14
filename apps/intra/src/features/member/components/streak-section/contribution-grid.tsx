'use client';

import { cn } from '@hiarc-platform/ui';
import { addDays, differenceInDays, endOfYear, format, getDay, startOfYear } from 'date-fns';

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
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 11, 31));

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

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const daysSinceYearStart = differenceInDays(monthStart, yearStart);
      const weekPosition = Math.floor((daysSinceYearStart + startDayOfWeek) / 7);
      const left = weekPosition * (boxSize + boxGap);

      if (monthStarts.length === 0 || weekPosition > monthStarts[monthStarts.length - 1]) {
        positions.push({ month: monthLabels[month], left });
        monthStarts.push(weekPosition);
      }
    }

    return positions;
  };

  const monthPositions = getMonthPositions();

  return (
    <div className="relative">
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
  );
}
