'use client';

import React from 'react';
import { SelectOption } from '@hiarc-platform/shared';
import { SideBar } from './side-bar';
import { UrlInput } from './url-input';
import { Button } from '../button';
import { LabeledCalanderInput } from '../input/labeled-calander-input';
import { LabeledInput } from '../input/labeled-input';
import { LabeledTextarea } from '../input/labeled-textarea';
import { LabeledImageInput } from '../input/labeled-image-input';
import { AnnouncementFormData } from '../../hooks/use-announcement-form';

interface DesktopAnnouncementWriteProps {
  formData: AnnouncementFormData;
  studyOptions?: SelectOption[];
  disableCategoryChange?: boolean;
  disableStudyTypeChange?: boolean;
  isEditMode: boolean;
  onFormDataChange(updates: Partial<AnnouncementFormData>): void;
  onSubmit(): void;
  onAddUrl(): void;
  onUpdateUrl(index: number, value: string): void;
  onRemoveUrl(index: number): void;
  onImageChange(images: File[]): void;
  onExistingImageChange(images: unknown[]): void;
}

export function DesktopAnnouncementWrite({
  formData,
  studyOptions = [],
  disableCategoryChange = false,
  disableStudyTypeChange = false,
  isEditMode,
  onFormDataChange,
  onSubmit,
  onAddUrl,
  onUpdateUrl,
  onRemoveUrl,
  onImageChange,
  onExistingImageChange,
}: DesktopAnnouncementWriteProps): React.ReactElement {
  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col gap-4">
        <LabeledInput
          label="제목"
          placeholder="제목을 입력해주세요"
          required={true}
          value={formData.title}
          onChange={(value) => onFormDataChange({ title: value })}
        />
        <div className="flex gap-4">
          <LabeledInput
            label="장소"
            placeholder="장소를 입력해주세요"
            value={formData.place || ''}
            onChange={(value) => onFormDataChange({ place: value || undefined })}
          />
          <LabeledCalanderInput
            placeholder="시작 일시를 선택해주세요"
            label="시작 일시"
            value={
              formData.scheduleStartAt
                ? formData.scheduleStartAt instanceof Date
                  ? formData.scheduleStartAt
                  : new Date(formData.scheduleStartAt)
                : null
            }
            showTimeSelect={true}
            timeIntervals={30}
            onChange={(value) => {
              if (!Array.isArray(value)) {
                onFormDataChange({ scheduleStartAt: value || undefined });
              }
            }}
          />
        </div>
        <LabeledTextarea
          label="본문"
          placeholder="내용을 입력해주세요."
          required={true}
          className="aspect-[2/1] text-lg"
          value={formData.content}
          onChange={(value) => onFormDataChange({ content: value })}
        />
        <LabeledImageInput
          label="이미지"
          value={formData.images || []}
          existingImages={formData.imageSources || []}
          onChange={onImageChange}
          onExistingImagesChange={onExistingImageChange}
        />

        <div className="flex flex-col gap-2">
          {(formData.attachmentUrls || []).map((url, index) => (
            <UrlInput
              key={index}
              value={url}
              onChange={(value) => onUpdateUrl(index, value)}
              onRemove={() => onRemoveUrl(index)}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button size="md" className="w-[112px]" variant="fill_secondary" onClick={onAddUrl}>
            URL 추가
          </Button>
        </div>
      </div>

      <SideBar
        formData={formData}
        onFormDataChange={onFormDataChange}
        studyOptions={studyOptions}
        disableCategoryChange={disableCategoryChange}
        disableStudyTypeChange={disableStudyTypeChange}
        onSubmit={onSubmit}
        isLoading={false}
        buttonText={isEditMode ? '수정하기' : '게시하기'}
      />
    </div>
  );
}
