import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
} from '@hiarc-platform/ui';

interface BojGuideDialogProps {
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function BojGuideDialog({
  onSave,
  onCancel,
  showBackground = true,
}: BojGuideDialogProps): React.ReactElement {
  const handleConfirm = async (): Promise<void> => {
    try {
      if (onSave) {
        await onSave();
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('확인 실패:', error);
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[380px]" showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>백준 가이드</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <ol className="mt-2 list-decimal space-y-4 pl-5">
            <li>백준(BOJ)과 solved.ac에 관해 알아보기</li>
            <li>
              백준 사이트에 가입한 후, 소속 학교를 홍익대학교로 설정해주세요.
              <br />
              학회 활동 시 활용될 예정입니다.
            </li>
            <li>solved.ac에 가입할 때, 백준 핸들을 연동하여 가입을 완료해주세요.</li>
          </ol>
        </DialogDescription>
        <Button className="mt-4 w-full" onClick={handleConfirm}>
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
