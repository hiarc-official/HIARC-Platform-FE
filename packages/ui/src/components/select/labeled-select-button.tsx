'use client';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Label } from '../label/label';
interface LabeledSelectButtonProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: string[];
  value?: string;
  onChange?(value: string): void;
  className?: string;
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

      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={value === option ? 'line' : 'unselected'}
            onClick={() => onChange?.(option)}
            className="h-11 w-full"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledSelectButton };
