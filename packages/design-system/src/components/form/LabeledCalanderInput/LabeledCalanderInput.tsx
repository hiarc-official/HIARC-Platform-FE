'use client';
import * as React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { cn } from '../../../lib/utils';
import { Label } from '../../typography/Label/Label';
import { Calendar } from '../Calendar/Calendar';
import { Popover, PopoverTrigger, PopoverContent } from '../../overlay/Popover/Popover';
import { ScheduleIcon } from '../../../icons';

interface LabeledInputProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  value: Date | null | [Date | null, Date | null];
  onChange(value: Date | null | [Date | null, Date | null]): void;
  placeholder?: string;
  rangeMode?: boolean;
  // 시간 선택은 더 이상 지원하지 않으나(미사용) API 호환을 위해 prop 은 남겨둔다.
  showTimeSelect?: boolean;
  timeIntervals?: number;
  error?: string;
  className?: string;
}

const fmt = (d: Date): string => format(d, 'yyyy-MM-dd');

// Radix Popover + Calendar(react-day-picker) 로 구성한 날짜 선택 입력.
function LabeledCalanderInput({
  placeholder,
  label,
  showLabel = true,
  required = false,
  value,
  onChange,
  rangeMode = false,
  error,
  className,
}: LabeledInputProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [start, end] = Array.isArray(value) ? value : [value, null];

  const display = rangeMode
    ? start
      ? `${fmt(start)}${end ? ` ~ ${fmt(end)}` : ''}`
      : ''
    : start
      ? fmt(start)
      : '';

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex h-11 w-full items-center gap-2 rounded-md border border-gray-200 bg-transparent px-3 text-left text-md outline-none',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              !display && 'text-gray-500'
            )}
          >
            <ScheduleIcon className="h-4 w-4 shrink-0" width={16} height={16} />
            <span className="truncate">{display || placeholder}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {rangeMode ? (
            <Calendar
              mode="range"
              selected={{ from: start ?? undefined, to: end ?? undefined }}
              onSelect={(range: DateRange | undefined) =>
                onChange([range?.from ?? null, range?.to ?? null])
              }
            />
          ) : (
            <Calendar
              mode="single"
              selected={start ?? undefined}
              onSelect={(date) => {
                onChange(date ?? null);
                setOpen(false);
              }}
            />
          )}
        </PopoverContent>
      </Popover>
      {error && (
        <div className="mt-1">
          <Label size="sm" className="text-red">
            {error}
          </Label>
        </div>
      )}
    </div>
  );
}

export { LabeledCalanderInput };
