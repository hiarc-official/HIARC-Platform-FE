'use client';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Label } from '../label/label';
interface LabeledSelectButtonProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: string[];
  className?: string;
}

function LabeledSelectButton({
  label,
  showLabel = true,
  required = false,
  options,
  className = '',
}: LabeledSelectButtonProps): React.ReactElement {
  const [selected, setSelected] = useState<string>('');

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
            key={option}
            variant={selected === option ? 'line' : 'unselected'}
            onClick={() => setSelected(option)}
            className="h-11"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledSelectButton };
