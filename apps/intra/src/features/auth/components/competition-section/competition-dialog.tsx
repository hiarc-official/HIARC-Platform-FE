'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  LabeledInput,
  LabeledSelectButton,
} from '@hiarc-platform/ui';
import React from 'react';

interface CompetitionDialogProps {
  onSave?: () => void;
  onCancel?: () => void;
}

export function CompetitionDialog({
  onSave,
  onCancel,
}: CompetitionDialogProps): React.ReactElement {
  const [formData, setFormData] = React.useState({
    organizer: '',
    name: '',
    date: '',
    type: '참여' as '참여' | '수상',
    award: '',
  });

  const handleSave = async (): Promise<void> => {
    // Here you can add form validation and API calls
    console.log('Competition data:', formData);
    alert('기록이 추가되었습니다.');
    onSave?.();
    DialogUtil.hideAllDialogs();
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="!w-[540px] !max-w-[540px]" fullscreen={true}>
        <DialogHeader>
          <DialogTitle>참여한 대회 기록하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 flex w-full flex-col gap-4">
            <ol className="list-disc pl-5 text-gray-700">
              <li>허위 정보로 판단될 경우, 운영진에 의해 삭제될 수 있습니다.</li>
              <li>
                운영진도 대회 기록을 추가할 수 있으며, 운영진이 추가한 대회 이력은 삭제/수정할 수
                없습니다.
              </li>
            </ol>
            <LabeledInput
              label="주최단체명"
              placeholder="예) 현대모비스, 카카오, 홍익대학교"
              value={formData.organizer}
              onChange={(value) => setFormData((prev) => ({ ...prev, organizer: value }))}
            />
            <LabeledInput
              label="대회명"
              placeholder="예) 알고리즘 대회"
              value={formData.name}
              onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
            />
            <LabeledInput
              label="일시"
              placeholder="예) 코드 페스티벌, 알고리즘 경진대회"
              value={formData.date}
              onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
            />
            <LabeledSelectButton
              label="기록 유형"
              required={false}
              options={['참여', '수상']}
              value={formData.type}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value as '참여' | '수상' }))
              }
            />
            <LabeledInput
              label="수상 내역"
              placeholder="예) 본선 진출, 3위, 장려상, 특별상 등"
              value={formData.award}
              onChange={(value) => setFormData((prev) => ({ ...prev, award: value }))}
            />
          </div>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button className="w-full" size="lg" onClick={handleSave}>
            <Label size="lg">기록하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
