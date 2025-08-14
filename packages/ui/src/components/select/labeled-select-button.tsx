'use client';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Label } from '../label/label';

interface Option {
  value: string;
  label: string;
}

interface LabeledSelectButtonProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: Option[];
  value?: string;
  onChange?(value: string): void;
  className?: string;
  onChange?(value: string): void;
}

function LabeledSelectButton({
  label,
  showLabel = true,
  required = false,
  options,
  value,
  onChange,
  className = '',
}: LabeledSelectButtonProps): React.ReactElement {
  return (
    <div className={cn('flex-w-full w-full flex-col', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative-top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}

      <div
        className="grid w-full gap-2"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'line' : 'unselected'}
            onClick={() => onChange?.(option.value)}
            className="h-11 w-full"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledSelectButton };
