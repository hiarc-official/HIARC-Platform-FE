'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@hiarc-platform/ui';

interface UnauthorizedDialogProps {
  isOpen: boolean;
  onConfirm(): void;
}

export function UnauthorizedDialog({
  isOpen,
  onConfirm,
}: UnauthorizedDialogProps): React.ReactElement {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>인증이 필요합니다</DialogTitle>
          <DialogDescription>
            로그인이 만료되었거나 인증 정보가 없습니다.
            <br />홈 화면으로 이동하여 다시 로그인해주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm} className="w-full">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
