'use client';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/style.css';
import { cn } from '../../../lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// react-day-picker 기반 달력. 기본 레이아웃은 라이브러리 CSS 를 쓰고, 강조색만
// 디자인 토큰(primary)으로 덮어쓴다. Popover 와 조합해 데이트피커를 만든다.
function Calendar({ className, ...props }: CalendarProps): React.ReactElement {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays
      className={cn('p-3 text-md', className)}
      style={
        {
          '--rdp-accent-color': '#000947',
          '--rdp-accent-background-color': 'rgba(0, 9, 71, 0.08)',
          '--rdp-day_button-border-radius': '0.5rem',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Calendar };
