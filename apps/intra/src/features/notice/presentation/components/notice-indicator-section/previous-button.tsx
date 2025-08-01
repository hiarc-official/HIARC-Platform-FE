import { cn, Divider, Label } from '@hiarc-platform/ui';
import Image from 'next/image';

interface PreviousButtonProps {
  onClick(): void;
  className?: string;
}

export function PreviousButton({ onClick, className }: PreviousButtonProps): React.ReactElement {
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
          이전 공지사항명
        </Label>
      </span>

      {/* 데스크탑 */}
      <span className="hidden items-center gap-4 md:flex">
        <Image
          src="/ArrowLeft.svg"
          width={16}
          height={16}
          alt="Previous"
          className="inline-block"
        />
        <Label size="lg" weight="regular" className="cursor-pointer text-gray-900">
          이전글
        </Label>
        <Divider variant="vertical" size="18px" />
        <Label size="lg" weight="regular" className="cursor-pointer text-gray-700">
          이전 공지사항명
        </Label>
      </span>
    </button>
  );
}
