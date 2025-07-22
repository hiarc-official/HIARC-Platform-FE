'use client';
import { cn } from '../../lib/utils';
import { Label } from '../label/label';
import { Button } from '../button';
import { useState } from 'react';
interface LabeledSelectButtonProps {
  label: string;
  showLabel?: boolean;
  required: boolean;
  options: string[];
  className?: string;
}

function LabeledSelectButton({
  label,
  showLabel = true,
  required = false,
  options,

  className = '',
}: LabeledSelectButtonProps) {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className={cn('flex-w-full w-full flex-col', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}

      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={selected === option ? 'line' : 'unselected'}
            onClick={() => setSelected(option)}
            className="w-full"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledSelectButton };
