'use client';

import { ArrowLeftIcon } from '../../../icons';
import { cn } from '../../../lib/utils';
import { Label } from '../../typography/Label/Label';

interface BackButtonProps {
  onClick?(): void;
  className?: string;
}

export function BackButton({ onClick, className }: BackButtonProps): React.ReactElement {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center gap-2 self-start rounded-md p-2 transition-colors hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      <ArrowLeftIcon width={16} height={16} />
      <Label size="lg" className="cursor-pointer text-gray-700">
        뒤로가기
      </Label>
    </button>
  );
}
