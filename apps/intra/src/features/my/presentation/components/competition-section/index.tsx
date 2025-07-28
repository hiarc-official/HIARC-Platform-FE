import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  LabeledInput,
  LabeledSelectButton,
  Title,
} from '@hiarc-platform/ui';
import IconButton from '@hiarc-platform/ui/src/components/icon-button';
import React from 'react';
import { CompetitionListItem } from './competition-list-item';

export function CompetitionSection(): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  async function handleSave(): Promise<void> {
    alert('기록이 추가되었습니다.');
    setOpen(false);
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <Title size="sm" weight="bold">
          참여한 대회
        </Title>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <IconButton type="button" iconSrc="/Edit.svg" />
          </DialogTrigger>
          <DialogContent className="!w-[540px] !max-w-[540px]">
            <DialogHeader>
              <DialogTitle>참여한 대회 기록하기</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="flex w-full flex-col gap-4">
                <ol className="list-disc pl-5 text-gray-700">
                  <li>허위 정보로 판단될 경우, 운영진에 의해 삭제될 수 있습니다. </li>
                  <li>
                    운영진도 대회 기록을 추가할 수 있으며, 운영진이 추가한 대회 이력은 삭제/수정할
                    수 없습니다.
                  </li>
                </ol>
                <LabeledInput
                  label={'주최단체명'}
                  placeholder="예) 현대모비스, 카카오, 홍익대학교"
                />
                <LabeledInput label={'대회명'} placeholder="예) 알고리즘 대회" />
                <LabeledInput label={'일시'} placeholder="예) 코드 페스티벌, 알고리즘 경진대회" />
                <LabeledSelectButton
                  label={'기록 유형'}
                  required={false}
                  options={['참여', '수상']}
                />
                <LabeledInput
                  label={'수상 내역'}
                  placeholder="예) 본선 진출, 3위, 장려상, 특별상 등"
                />
              </div>
            </DialogDescription>
            <div className="flex w-full gap-2">
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
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
      <CompetitionListItem
        name={'대회 이름'}
        date={'2023-01-01'}
        award={'1등'}
        institution="고라니 대회"
      />
    </div>
  );
}
