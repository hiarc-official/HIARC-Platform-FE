'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  LabeledInput,
  LabeledSelectButton,
  LabeledSelector,
} from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import React, { useState } from 'react';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';
import { AnnnouncementType } from '@hiarc-platform/shared';

interface AnnouncementFilterDialogProps {
  onSave(filters: Partial<AnnouncementQueryParams>): void;
  onCancel(): void;
  initialValues?: Partial<AnnouncementQueryParams> & {
    announcementType?: AnnnouncementType;
    isPublic?: boolean;
    title?: string;
  };
}

export function AnnouncementFilterDialog({
  onSave,
  onCancel,
  initialValues,
}: AnnouncementFilterDialogProps): React.ReactElement {
  const [category, setCategory] = useState<AnnnouncementType | ''>(
    initialValues?.announcementType || ''
  );
  const [isPublic, setIsPublic] = useState<string>(
    initialValues?.isPublic === undefined ? '' : initialValues.isPublic ? 'true' : 'false'
  );
  const [title, setTitle] = useState<string>(initialValues?.title || '');

  const handleSave = (): void => {
    const filters: Partial<AnnouncementQueryParams> = {
      announcementType: category
        ? (category as AnnouncementQueryParams['announcementType'])
        : undefined,
      isPublic: isPublic === '' ? undefined : isPublic === 'true',
      title: title || undefined,
    };
    onSave(filters);
    DialogUtil.hideAllDialogs();
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  const handleReset = (): void => {
    setCategory('');
    setIsPublic('');
    setTitle('');
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent fullscreen className="flex max-h-screen flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>상세 검색</DialogTitle>
        </DialogHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-6">
          <div className="flex flex-col gap-6">
            <LabeledSelector
              label="카테고리"
              options={selectOption['카테고리']}
              placeholder="카테고리를 선택해주세요"
              value={category}
              onChange={(value: string) => setCategory(value as AnnnouncementType | '')}
            />

            <LabeledSelectButton
              label="공개여부"
              options={selectOption['공개여부']}
              value={isPublic}
              onChange={setIsPublic}
            />

            <LabeledInput
              label="제목"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(value) => setTitle(value)}
            />
          </div>
          <div className="flex-1" />
          <div className="mt-4 flex w-full flex-shrink-0 items-center gap-2">
            <Button size="md" variant="line_secondary" onClick={handleReset} className="w-full">
              초기화
            </Button>
            <Button size="md" onClick={handleSave} className="w-full">
              적용
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
