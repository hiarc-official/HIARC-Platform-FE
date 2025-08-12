'use client';
import { Button, LabeledInput, LabeledSelectButton } from '@hiarc-platform/ui';
import { useState } from 'react';

interface AwardRecordFormProps {
  onDelete(): void;
}

export function AwardRecordForm({ onDelete }: AwardRecordFormProps): React.ReactElement {
  const [oauth, setOauth] = useState<boolean>(false);
  const [isAward, setIsAward] = useState<boolean>(false);
  return (
    <div className="flex w-full gap-3">
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-end gap-2">
          <LabeledInput label="핸들명" placeholder="핸들명 입력하기" disabled={oauth} />
          {oauth ? (
            <LabeledSelectButton
              label="기록 유형"
              options={['참여', '수상']}
              onChange={(value) => setIsAward(value === '수상')}
            />
          ) : (
            <Button
              size="md"
              className="w-[118px]"
              onClick={() => {
                setOauth(!oauth);
              }}
            >
              인증하기
            </Button>
          )}
        </div>
        {isAward && (
          <LabeledInput label="수상내역" placeholder="예: 본선 진출, 3위, 장려상, 특별상 등" />
        )}
      </div>
      {oauth && (
        <div
          className="flex w-[20px] cursor-pointer items-center justify-center rounded-md bg-gray-300"
          onClick={onDelete}
          role="button"
          tabIndex={0}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              onDelete();
            }
          }}
        >
          <div className="h-[5px] w-[10px] rounded-md bg-white"></div>
        </div>
      )}
    </div>
  );
}
