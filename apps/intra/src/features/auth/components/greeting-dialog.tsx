import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
} from '@hiarc-platform/ui';

interface GreetingDialogProps {
  title: string;
  description: string;
  showBackground?: boolean;
}

export function GreetingDialog({
  title,
  description,
  showBackground = true,
}: GreetingDialogProps): React.ReactElement {
  const handleConfirm = async (): Promise<void> => {
    DialogUtil.hideAllDialogs();
  };

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[380px]" showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <Label size="lg" className="text-gray-700">
            {description}
          </Label>
        </DialogDescription>
        <Button className="w-full" onClick={handleConfirm}>
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
