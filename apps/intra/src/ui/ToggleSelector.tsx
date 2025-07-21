'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import { Label } from '@hiarc-platform/ui';

export default function ToggleSelector({
  placeholder,
  type,
  required,
}: {
  placeholder: string;
  type: string;
  required: boolean;
}): React.ReactElement {
  return (
    <div className="h-73px mt-2 flex w-[390px] flex-col">
      <div className="flex items-center">
        <Label>{type}</Label>
        {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
      </div>
      <Select>
        <SelectTrigger className="h-[44px] w-[390px] data-[placeholder]:text-gray-500  ">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectOption[type].map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
