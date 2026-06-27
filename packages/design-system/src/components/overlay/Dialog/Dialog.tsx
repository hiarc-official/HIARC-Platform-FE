'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { IconButton } from '../../action/IconButton/IconButton';
import { CloseIcon } from '../../../icons';

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>): React.ReactElement {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>): React.ReactElement {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>): React.ReactElement {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>): React.ReactElement {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.ReactElement {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        // 'data-[state=open]:animate-in',
        // 'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0',
        'fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

interface DialogHeaderProps extends React.ComponentProps<'div'> {
  fullscreen?: boolean;
}

function DialogHeader({
  className,
  fullscreen = false,
  children,
  ...props
}: DialogHeaderProps): React.ReactElement {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex gap-2 text-center sm:text-left',
        fullscreen ? 'flex-row items-center justify-between' : 'flex-col',
        className
      )}
      {...props}
    >
      {fullscreen ? (
        <>
          <div className="flex flex-col gap-2">{children}</div>
          <DialogPrimitive.Close asChild>
            <IconButton icon={<CloseIcon className="h-6 w-6" />} aria-label="닫기" />
          </DialogPrimitive.Close>
        </>
      ) : (
        children
      )}
    </div>
  );
}

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  fullscreen?: boolean;
  showBackground?: boolean;
}

function DialogContent({
  className,
  children,
  fullscreen = false,
  showBackground = true,
  ...props
}: DialogContentProps): React.ReactElement {
  // children을 순회하면서 DialogHeader에 fullscreen prop 전달
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DialogHeader) {
      return React.cloneElement(child as React.ReactElement<DialogHeaderProps>, {
        fullscreen,
      });
    }
    return child;
  });

  // Description이 없으면 Radix가 깨진 aria-describedby 경고를 띄우므로, 그 경우에만 명시적으로 제거.
  // Description이 있거나 호출부가 직접 지정한 경우는 그대로 둬서 접근성 연결을 유지.
  const hasDescription = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === DialogDescription
  );
  const ariaDescribedByFix =
    'aria-describedby' in props || hasDescription ? {} : { 'aria-describedby': undefined };

  return (
    <DialogPortal data-slot="dialog-portal">
      {showBackground && <DialogOverlay />}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'data-[state=open]:animate-in',
          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=open]:fade-in-0',
          'bg-white focus:outline-none focus-visible:outline-none',
          fullscreen
            ? [
                // Fullscreen 모드 (모바일에서만)
                'fixed inset-0 z-50 h-full w-full overflow-auto p-4',
                'data-[state=closed]:slide-out-to-bottom-2',
                'data-[state=open]:slide-in-from-bottom-2',
                // 데스크톱에서는 일반 중앙 팝업으로 표시 (기본 모드와 동일)
                'sm:fixed sm:bottom-auto sm:left-[50%] sm:right-auto sm:top-[50%] sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-md sm:border sm:p-7 sm:shadow-lg',
                'sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95',
              ]
            : [
                // 기본 모드
                'data-[state=closed]:zoom-out-95',
                'data-[state=open]:zoom-in-95',
                // 모바일(기본): 바텀시트
                'fixed bottom-0 left-0 right-0 top-auto z-50 max-h-[90dvh] w-full overflow-auto rounded-t-xl border p-7 shadow-lg duration-200',
                // 데스크톱(sm 이상): 중앙 팝업
                'sm:bottom-auto sm:left-[50%] sm:right-auto sm:top-[50%] sm:max-h-[90vh] sm:max-w-lg sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-md sm:p-7',
              ],
          className
        )}
        {...props}
        {...ariaDescribedByFix}
      >
        {modifiedChildren}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.ReactElement {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('font-pretendard text-2xl font-bold leading-none', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>): React.ReactElement {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-lg font-normal text-gray-700', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
