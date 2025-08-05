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
  className?: string;
}

export function MyInfoSection({ className }: MyInfoSectionProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  async function handleSave(): Promise<void> {
    alert('자기소개가 추가되었습니다.');
    setOpen(false);
  }

  return (
    <div className={cn('flex w-full flex-col gap-4 ', className)}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center gap-2">
            <Title size="sm" weight="bold">
              optiprime
            </Title>
            <Title size="sm" weight="semibold" className="text-gray-500">
              {'(김예송)'}
            </Title>
            <CategoryChip />
            <CategoryChip />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <IconButton type="button" iconSrc="/Edit.svg" />
            </DialogTrigger>
            <DialogContent className="!w-[540px] !max-w-[540px]">
              <DialogHeader>
                <DialogTitle className="w-full">자기소개 한줄 작성하기</DialogTitle>
              </DialogHeader>
              <DialogDescription className="mt-6 w-[540px]">
                <LabeledInput label={''} placeholder="예) 좋은 아침입니다! 줄여서 좋아!" />
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
        <Label>자기소개 한줄</Label>
      </div>
    </div>
  );
}
