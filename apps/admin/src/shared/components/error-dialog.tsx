'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Label,
  VisuallyHidden,
} from '@hiarc-platform/ui';
import Image from 'next/image';
import { useErrorStore } from '../store/error-store';

export function ErrorDialog(): React.ReactElement | null {
  const { currentError, isDialogOpen, closeDialog, clearCurrentError } = useErrorStore();

  const handleClose = (): void => {
    closeDialog();
    // 다이얼로그 닫힌 후 약간의 지연을 두고 에러 제거
    setTimeout(() => {
      clearCurrentError();
    }, 200);
  };

  if (!currentError) {
    return null;
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-sm">
        <VisuallyHidden>
          <AlertDialogTitle>에러 알림</AlertDialogTitle>
        </VisuallyHidden>
        {/* 중앙 정렬된 컨텐츠 */}
        <div className="flex flex-col items-center space-y-4 py-2 text-center">
          {/* SVG 아이콘 */}
          <div className="flex justify-center">
            <Image src="/shared-assets/Error.svg" alt="Error Icon" width={36} height={36} />
          </div>
          <AlertDialogDescription className="mt-6">
            <Label size="lg" weight="medium">
              {currentError.message}
            </Label>
          </AlertDialogDescription>
          {/* 닫기 버튼 */}
          <AlertDialogFooter className="pt-6">
            <AlertDialogCancel onClick={handleClose}>닫기</AlertDialogCancel>
          </AlertDialogFooter>
          {/* Development Info - 개발 모드에서만 표시 */}
          {process.env.NODE_ENV === 'development' && currentError.stack && (
            <details className="w-full text-left">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600">
                개발자 정보
              </summary>
              <pre className="mt-2 max-h-24 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-600">
                {currentError.stack}
              </pre>
              {currentError.context && (
                <pre className="mt-1 max-h-24 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-600">
                  {JSON.stringify(currentError.context, null, 2)}
                </pre>
              )}
            </details>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}