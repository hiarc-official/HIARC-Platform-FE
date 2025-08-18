'use client';

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React, { useState } from 'react';
import { StudyQueryParams } from '../../types/request/study-query-params';

interface StudySearchDialogProps {
  onSave?(params: Partial<StudyQueryParams>): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function StudySearchDialog({
  onSave,
  onCancel,
  showBackground = true,
}: StudySearchDialogProps): React.ReactElement {
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSave = async (): Promise<void> => {
    try {
      const searchParams: Partial<StudyQueryParams> = {};

      if (searchTitle.trim()) {
        searchParams.search = searchTitle.trim();
      }

      if (selectedSemester) {
        searchParams.category = selectedSemester;
      }

      if (selectedStatus) {
        searchParams.status = selectedStatus as 'active' | 'completed' | 'cancelled';
      }

      if (onSave) {
        await onSave(searchParams);
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('검색 실패:', error);
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  const handleReset = (): void => {
    setSearchTitle('');
    setSelectedSemester('');
    setSelectedStatus('');
  };

  // 임시 옵션들 (실제로는 API에서 가져와야 함)
  const semesterOptions = [
    { label: '전체', value: '' },
    { label: '2024-1', value: '2024-1' },
    { label: '2024-2', value: '2024-2' },
    { label: '2023-1', value: '2023-1' },
    { label: '2023-2', value: '2023-2' },
  ];

  const statusOptions = [
    { label: '전체', value: '' },
    { label: '진행중', value: 'active' },
    { label: '완료', value: 'completed' },
    { label: '취소', value: 'cancelled' },
  ];

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent fullscreen showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>스터디 검색</DialogTitle>
        </DialogHeader>
        <div className="pt-6">
          <div className={cn('flex flex-col gap-6')}>
            <LabeledSelector
              placeholder="진행 학기를 선택하세요"
              required={false}
              label="진행 학기"
              options={semesterOptions}
              value={selectedSemester}
              onChange={(value: string) => {
                setSelectedSemester(value);
              }}
            />
            <LabeledSelector
              placeholder="상태를 선택하세요"
              required={false}
              label="스터디 상태"
              options={statusOptions}
              value={selectedStatus}
              onChange={(value: string) => {
                setSelectedStatus(value);
              }}
            />
            <LabeledInput
              label="스터디명"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="스터디명을 입력하세요"
            />
            <div className="flex w-full items-center gap-2">
              <Button variant="secondary" size="md" className="w-full" onClick={handleReset}>
                초기화
              </Button>
              <Button
                variant="fill"
                size="md"
                className="w-full bg-primary-200"
                onClick={handleSave}
              >
                검색
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
