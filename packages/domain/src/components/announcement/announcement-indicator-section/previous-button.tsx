import { ArrowLeftIcon } from '@hiarc-platform/design-system';
import { cn } from '@hiarc-platform/design-system';
import { Divider } from '@hiarc-platform/design-system';
import { Label } from '@hiarc-platform/design-system';
interface PreviousButtonProps {
  prevTitle?: string;
  onClick(): void;
  className?: string;
}

export function PreviousButton({
  prevTitle,
  onClick,
  className,
}: PreviousButtonProps): React.ReactElement {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-sm p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900',
        className
      )}
      onClick={onClick}
    >
      {/* 모바일 */}
      <span className="flex items-center gap-2 text-gray-900 md:hidden">
        <Label size="lg" className="text-gray-900">
          이전글
        </Label>
        <Divider variant="vertical" size="18px" />
        <Label size="lg" className="text-gray-700">
          {prevTitle}
        </Label>
      </span>

      {/* 데스크탑 */}
      <span className="hidden items-center gap-4 md:flex">
        <ArrowLeftIcon width={16} height={16} className="inline-block" />
        <Label size="lg" weight="regular" className="cursor-pointer text-gray-900">
          이전글
        </Label>
        <Divider variant="vertical" size="18px" />
        <Label size="lg" weight="regular" className="cursor-pointer text-gray-700">
          {prevTitle}
        </Label>
      </span>
    </button>
  );
}
