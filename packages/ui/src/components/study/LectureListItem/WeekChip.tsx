import { Label } from '@hiarc-platform/ui';

export function WeekChip({ week }: { week: number }): React.ReactElement {
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-200 px-3 py-1">
      <Label size="sm" className="text-primary-300">
        {week}회차
      </Label>
    </div>
  );
}
