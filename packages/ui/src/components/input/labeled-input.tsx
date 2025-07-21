'use client';

import * as React from 'react';
import { Label } from '../label/label';
import { Input } from './input';

interface LabeledInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  onChange?(value: string): void;
}

function LabeledInput({
  placeholder,
  label,
  showLabel = true,
  required = false,
  value,
  onChange,
  ...props
}: LabeledInputProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium">{label}</Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-11 w-full"
        {...props}
      />
    </div>
  );
}

export { LabeledInput };
