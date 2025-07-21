'use client';

import { Label } from '../label/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

interface Option {
  value: string;
  label: string;
}

interface LabeledSelectorProps {
  placeholder: string;
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: Option[];
  value?: string;
  onChange?(value: string): void;
}

function LabeledSelector({
  placeholder,
  label,
  showLabel = true,
  required = false,
  options,
  value,
  onChange,
}: LabeledSelectorProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium">{label}</Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full data-[placeholder]:text-gray-500">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.length > 0 ? (
              options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))
            ) : (
              <div className="flex h-10 items-center justify-center">
                <Label className=" text-gray-700">선택 가능한 항목이 없습니다.</Label>
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export { LabeledSelector };
