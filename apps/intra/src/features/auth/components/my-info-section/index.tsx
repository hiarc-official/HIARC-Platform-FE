import {
  Button,
  CategoryChip,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  IconButton,
  Label,
  LabeledInput,
  Title,
} from '@hiarc-platform/ui';
import React from 'react';

interface MyInfoSectionProps {
  name?: string;
  bojHandle?: string;
  introduction?: string;
  className?: string;
  onSave?(introduction: string): Promise<void>;
}

export function MyInfoSection({
  className,
  introduction,
  name,
  bojHandle,
  onSave,
}: MyInfoSectionProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [introductionValue, setIntroductionValue] = React.useState(introduction || '');

  async function handleSave(): Promise<void> {
    console.log('💾 [MY INFO] 저장 시작:', introductionValue);

    try {
      if (onSave) {
        await onSave(introductionValue);
        console.log('✨ [MY INFO] 저장 성공');
      } else {
        console.log('⚠️ [MY INFO] onSave 함수 없음');
      }
      setOpen(false);
    } catch (error) {
      console.error('💥 [MY INFO] 저장 실패:', error);
      // 에러는 상위 컴포넌트에서 처리하도록 다시 throw
      throw error;
    }
  }

  return (
    <div className={cn('flex w-full flex-col gap-4 ', className)}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center gap-2">
            <Title size="sm" weight="bold" disableAnimation={true}>
              {bojHandle}
            </Title>
            <Title size="sm" weight="semibold" disableAnimation={true} className="text-gray-500">
              ({name})
            </Title>
            <CategoryChip />
            <CategoryChip />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <IconButton type="button" iconSrc="/shared-assets/Edit.svg" />
            </DialogTrigger>
            <DialogContent className="!w-[540px] !max-w-[540px]">
              <DialogHeader>
                <DialogTitle className="w-full">자기소개 한줄 작성하기</DialogTitle>
              </DialogHeader>
              <DialogDescription className="mt-6 w-[540px]">
                <LabeledInput
                  label=""
                  placeholder="예) 좋은 아침입니다! 줄여서 좋아!"
                  value={introductionValue}
                  onChange={(value) => setIntroductionValue(value)}
                />
              </DialogDescription>
              <div className="mt-6 flex w-full gap-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  <Label size="lg">취소</Label>
                </Button>
                <Button className="w-full" size="lg" onClick={handleSave}>
                  <Label size="lg">기록하기</Label>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Label className={cn(!introduction ? 'text-gray-500' : 'text-gray-900')}>
          {introduction ?? '자기소개가 없습니다.'}
        </Label>
      </div>
    </div>
  );
}
