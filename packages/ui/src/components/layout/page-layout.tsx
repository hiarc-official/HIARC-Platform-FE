import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PageLayoutProps {
  children?: ReactNode;
  mobileChildren?: ReactNode;
  desktopChildren?: ReactNode;
  stickyBottom?: ReactNode;
  className?: string;
  containerClassName?: string;
  stickyBottomClassName?: string;
}

export function PageLayout({
  children,
  mobileChildren,
  desktopChildren,
  stickyBottom,
  className,
  containerClassName,
  stickyBottomClassName,
}: PageLayoutProps): React.ReactElement {
  const hasMobileDesktopSplit = mobileChildren || desktopChildren;

  return (
    <div className={cn('relative flex w-full flex-col items-center', className)}>
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1200px] items-center justify-between px-10 py-4',
          stickyBottom ? 'pb-72' : '',
          containerClassName
        )}
      >
        {hasMobileDesktopSplit ? (
          <>
            {mobileChildren && <div className="block w-full md:hidden">{mobileChildren}</div>}
            {desktopChildren && <div className="hidden w-full md:block">{desktopChildren}</div>}
          </>
        ) : (
          <div className="w-full">{children}</div>
        )}
      </div>
      {stickyBottom && (
        <div
          className={cn(
            'pointer-events-auto sticky bottom-8 z-10',
            'mx-auto mb-4 flex w-full max-w-[1200px] justify-center px-10',
            stickyBottomClassName
          )}
        >
          {stickyBottom}
        </div>
      )}
    </div>
  );
}
