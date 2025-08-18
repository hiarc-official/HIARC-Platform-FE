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
  LabeledSelector,
} from '@hiarc-platform/ui';
import React, { useState } from 'react';
import { useCreateAdmin } from '@/features/student/hooks';
import { useSelectedSemester } from '@/hooks/use-semester-store';

interface AddStaffDialogProps {
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function AddStaffDialog({
  onSave,
  onCancel,
  showBackground = true,
}: AddStaffDialogProps): React.ReactElement {
  const [bojHandle, setBojHandle] = useState('');
  const [adminRole, setAdminRole] = useState<
    'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE'
  >('STAFF');

  const { selectedSemesterId } = useSelectedSemester();
  const createAdminMutation = useCreateAdmin();
  const handleSave = async (): Promise<void> => {
    if (!bojHandle.trim()) {
      alert('핸들명을 입력해주세요.');
      return;
    }

    try {
      if (!selectedSemesterId) {
        alert('학기를 선택해주세요.');
        return;
      }

      await createAdminMutation.mutateAsync({
        semesterId: Number(selectedSemesterId),
        bojHandle: bojHandle.trim(),
        adminRole,
      });

      if (onSave) {
        await onSave();
      }

      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent
        className="!w-[540px] !max-w-[540px]"
        showBackground={showBackground}
        onOpenAutoFocus={(ev) => ev.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>직함 추가하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 flex w-full flex-col gap-6">
            <div className="flex items-end gap-2">
              <LabeledInput
                label="핸들명"
                placeholder="핸들명 입력하기"
                value={bojHandle}
                onChange={(value) => setBojHandle(value)}
              />
              <Button size="md" className="w-[120px]">
                인증하기
              </Button>
            </div>
            <LabeledSelector
              label="직함"
              placeholder="직함을 입력해주세요"
              options={[
                { value: 'STAFF', label: '스태프' },
                { value: 'SECRETARY', label: '총무' },
                { value: 'VICE_PRESIDENT', label: '부회장' },
                { value: 'PRESIDENT', label: '회장' },
              ]}
              value={adminRole}
              onChange={(value) => setAdminRole(value as typeof adminRole)}
            />
          </div>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSave}
            disabled={createAdminMutation.isPending}
          >
            <Label size="lg">{createAdminMutation.isPending ? '추가 중...' : '추가하기'}</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
