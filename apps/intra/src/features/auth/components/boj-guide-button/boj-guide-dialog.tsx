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
import Image from 'next/image';

interface BojGuideDialogProps {
  showBackground?: boolean;
}

export function BojGuideDialog({ showBackground = true }: BojGuideDialogProps): React.ReactElement {
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
          <DialogTitle>백준 가이드</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="mt-2 space-y-6">
            <div>
              <div className="mb-2 flex">
                <Label className="mr-2 font-medium">1.</Label>
                <Label>백준(BOJ)과 solved.ac에 관해 알아보기</Label>
              </div>
              <Button
                className="mb-6"
                variant="secondary"
                size="xs"
                onClick={() =>
                  window.open(
                    'https://ethereal-wolf-335.notion.site/solved-ac-0c11e694fa6143929554f33f0e183da3',
                    '_blank'
                  )
                }
              >
                <Label>소개 바로가기</Label>
                <Image
                  src="/shared-assets/Open.svg"
                  alt="Link to solved.ac"
                  width={16}
                  height={16}
                />
              </Button>
            </div>
            <div>
              <div className="mb-2 flex">
                <Label className="mr-2 font-medium">2.</Label>
                <Label>
                  백준 사이트에 가입한 후, 소속 학교를 홍익대학교로 설정해주세요.
                  <br />
                  학회 활동 시 활용될 예정입니다.
                </Label>
              </div>
              <Button
                className="mb-6"
                variant="secondary"
                size="xs"
                onClick={() =>
                  window.open(
                    'https://ethereal-wolf-335.notion.site/6bf4a94a2544439cab519102a725c361?pvs=74',
                    '_blank'
                  )
                }
              >
                <Label>가이드 바로가기</Label>
                <Image
                  src="/shared-assets/Open.svg"
                  alt="Link to solved.ac"
                  width={16}
                  height={16}
                />
              </Button>
            </div>
            <div>
              <div className="mb-2 flex">
                <Label className="mr-2 font-medium">3.</Label>
                <Label>solved.ac에 가입할 때, 백준 핸들을 연동하여 가입을 완료해주세요.</Label>
              </div>
              <Button
                className="mb-6"
                variant="secondary"
                size="xs"
                onClick={() =>
                  window.open(
                    'https://ethereal-wolf-335.notion.site/solved-ac-0c11e694fa6143929554f33f0e183da3?pvs=74',
                    '_blank'
                  )
                }
              >
                <Label>가이드 바로가기</Label>
                <Image
                  src="/shared-assets/Open.svg"
                  alt="Link to solved.ac"
                  width={16}
                  height={16}
                />
              </Button>
            </div>
          </div>
        </DialogDescription>
        <Button className="w-full" onClick={handleConfirm}>
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
