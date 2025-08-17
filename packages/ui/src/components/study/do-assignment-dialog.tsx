'use client';

import { Button } from '../button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogDescription } from '../dialog/dialog';

interface DoAssignmentDialogProps {
  onComplete(): void;
  onDoAssignment?(): void;
}

export function DoAssignmentDialog({ onComplete, onDoAssignment }: DoAssignmentDialogProps): React.ReactElement {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>과제하기</DialogTitle>
          <DialogDescription>과제를 제출하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              variant="fill"
              size="sm"
              onClick={() => {
                onDoAssignment?.();
                onComplete();
              }}
            >
              제출
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}