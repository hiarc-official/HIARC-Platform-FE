'use client';

import React from 'react';
import { SelectOption } from '@hiarc-platform/shared';
import { UrlInput } from './url-input';
import { Button } from '../button';
import { LabeledCalanderInput } from '../input/labeled-calander-input';
import { LabeledInput } from '../input/labeled-input';
import { LabeledTextarea } from '../input/labeled-textarea';
import { LabeledImageInput } from '../input/labeled-image-input';
import { LabeledSelector } from '../select/labeled-selector';
import { LabeledSelectButton } from '../select/labeled-select-button';
import { DialogUtil } from '../../utils/dialog-util';
import { Title } from '../label/title';
import { AnnouncementFormData } from '../../hooks/use-announcement-form';

interface MobileAnnouncementWriteProps {
  formData: AnnouncementFormData;
  studyOptions?: SelectOption[];
  disableCategoryChange?: boolean;
  disableStudyTypeChange?: boolean;
  isEditMode: boolean;
  currentStep: number;
  setCurrentStep(step: number): void;
  onFormDataChange(updates: Partial<AnnouncementFormData>): void;
  onSubmit(): void;
  onCancel?(): void;
  onAddUrl(): void;
  onUpdateUrl(index: number, value: string): void;
  onRemoveUrl(index: number): void;
  onImageChange(images: File[]): void;
  onExistingImageChange(images: unknown[]): void;
}

export function MobileAnnouncementWrite({
  formData,
  studyOptions = [],
  disableCategoryChange = false,
  disableStudyTypeChange = false,
  isEditMode,
  currentStep,
  setCurrentStep,
  onFormDataChange,
  onSubmit,
  onCancel,
  onAddUrl,
  onUpdateUrl,
  onRemoveUrl,
  onImageChange,
  onExistingImageChange,
}: MobileAnnouncementWriteProps): React.ReactElement {
  // Step 1 검증 함수
  const validateStep1 = (): boolean => {
    if (!formData.announcementType) {
      DialogUtil.showError('카테고리를 선택해주세요.');
      return false;
    }

    if (formData.announcementType === 'STUDY') {
      if (!formData.studyId) {
        DialogUtil.showError('스터디를 선택해주세요.');
        return false;
      }
      if (formData.studyAnnounceType === '회차별 공지' && !formData.lectureRound) {
        DialogUtil.showError('회차를 선택해주세요.');
        return false;
      }
    } else {
      if (formData.applyType === '신청 유형') {
        if (
          !formData.applicationStartAt ||
          !formData.applicationEndAt ||
          !formData.applicationUrl?.trim()
        ) {
          DialogUtil.showError('신청 시작일, 신청 종료일, 신청 URL을 모두 입력해주세요.');
          return false;
        }
      }
    }

    return true;
  };

  // 다음 버튼 클릭
  const handleNext = (): void => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // 이전 버튼 클릭
  const handlePrevious = (): void => {
    setCurrentStep(1);
  };

  // 폼 제출 함수 (Step 2에서 사용)
  const handleSubmit = (): void => {
    if (!formData.title.trim() || !formData.content.trim()) {
      DialogUtil.showError('제목과 본문을 모두 입력해주세요.');
      return;
    }
    onSubmit();
  };

  // 옵션 데이터
  const categoryOptionList = [
    { value: 'STUDY', label: '스터디' },
    { value: 'RATING', label: '하이팅' },
    { value: 'GENERAL', label: '일반' },
    { value: 'EXTERNAL', label: '외부 공지' },
    { value: 'ETC', label: '기타' },
  ];

  const publicTypeOptionList = [
    { value: '공개', label: '공개' },
    { value: '비공개', label: '비공개' },
  ];

  const applyTypeOptionList = [
    { value: '신청 유형', label: '신청 유형' },
    { value: '신청 없음', label: '신청 없음' },
  ];

  const studyAnnounceTypeOptionList = [
    { value: '일반', label: '일반' },
    { value: '회차별 공지', label: '회차별 공지' },
  ];

  const lectureRoundOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}회차`,
  }));

  return (
    <div className="flex flex-col">
      {/* Step 1: 기본정보 */}
      {currentStep === 1 && (
        <>
          <div className="pb-24">
            <Title size="xs" weight="bold" className="mb-6">
              Step 1. 기본정보
            </Title>

            <div className="flex flex-col gap-4">
              {/* 카테고리 선택 */}
              <LabeledSelector
                placeholder="카테고리를 선택해주세요."
                required={true}
                options={categoryOptionList}
                label="카테고리"
                value={formData.announcementType}
                disabled={disableCategoryChange}
                onChange={(value: string) => {
                  const announcementType = value as
                    | 'STUDY'
                    | 'RATING'
                    | 'GENERAL'
                    | 'ETC'
                    | 'EXTERNAL';
                  onFormDataChange({
                    announcementType,
                    ...(announcementType === 'STUDY' && { applyType: '신청 없음' }),
                  });
                }}
              />

              {/* STUDY 카테고리일 때 스터디 선택 */}
              {formData.announcementType === 'STUDY' && (
                <LabeledSelector
                  placeholder="스터디를 선택해주세요."
                  options={studyOptions}
                  label="스터디 선택"
                  required={true}
                  value={formData.studyId?.toString() || ''}
                  disabled={disableCategoryChange}
                  onChange={(value: string) => {
                    const studyId = value ? Number(value) : undefined;
                    onFormDataChange({ studyId });
                  }}
                />
              )}

              {/* STUDY 카테고리일 때 */}
              {formData.announcementType === 'STUDY' ? (
                <>
                  {/* 스터디 공지 유형 */}
                  <LabeledSelectButton
                    label="스터디 공지 유형"
                    required={true}
                    value={formData.studyAnnounceType || '일반'}
                    options={studyAnnounceTypeOptionList}
                    disabled={disableStudyTypeChange}
                    onChange={(value: string) => {
                      onFormDataChange({ studyAnnounceType: value as '일반' | '회차별 공지' });
                    }}
                  />

                  {/* 회차별 공지를 선택했을 때 회차 선택 */}
                  {formData.studyAnnounceType === '회차별 공지' && (
                    <LabeledSelector
                      placeholder="회차를 선택해주세요."
                      options={lectureRoundOptions}
                      label="회차 선택"
                      required
                      value={formData.lectureRound?.toString() || ''}
                      onChange={(value: string) => {
                        const lectureRound = value ? Number(value) : undefined;
                        onFormDataChange({ lectureRound });
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* 다른 카테고리일 때 신청 유형 */}
                  <LabeledSelectButton
                    label="신청 유형"
                    required
                    value={formData.applyType || '신청 없음'}
                    options={applyTypeOptionList}
                    onChange={(value: string) => {
                      const applyType = value as '신청 없음' | '신청 유형';
                      onFormDataChange({
                        applyType,
                        ...(applyType === '신청 없음' && {
                          applicationStartAt: undefined,
                          applicationEndAt: undefined,
                          applicationUrl: undefined,
                        }),
                      });
                    }}
                  />

                  {/* 신청 유형을 선택했을 때 */}
                  {formData.applyType === '신청 유형' && (
                    <>
                      <LabeledCalanderInput
                        placeholder="신청 시작일을 선택해주세요"
                        label="신청 시작일"
                        required
                        value={
                          formData.applicationStartAt
                            ? formData.applicationStartAt instanceof Date
                              ? formData.applicationStartAt
                              : new Date(formData.applicationStartAt)
                            : null
                        }
                        onChange={(value: Date) => {
                          if (!Array.isArray(value)) {
                            onFormDataChange({ applicationStartAt: value });
                          }
                        }}
                      />
                      <LabeledCalanderInput
                        placeholder="신청 종료일을 선택해주세요"
                        label="신청 종료일"
                        required={true}
                        value={
                          formData.applicationEndAt
                            ? formData.applicationEndAt instanceof Date
                              ? formData.applicationEndAt
                              : new Date(formData.applicationEndAt)
                            : null
                        }
                        onChange={(value: Date) => {
                          if (!Array.isArray(value)) {
                            onFormDataChange({ applicationEndAt: value });
                          }
                        }}
                      />
                      <LabeledInput
                        label="신청 URL"
                        required={true}
                        placeholder="신청 URL을 입력해주세요"
                        value={formData.applicationUrl || ''}
                        onChange={(value: string) =>
                          onFormDataChange({ applicationUrl: value || undefined })
                        }
                      />
                    </>
                  )}
                </>
              )}

              {/* 공개 여부 */}
              <LabeledSelectButton
                label="공개 여부"
                required
                value={formData.publicType || '공개'}
                options={publicTypeOptionList}
                onChange={(value: string) => {
                  onFormDataChange({ publicType: value as '공개' | '비공개' });
                }}
              />
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
            <div className="flex gap-3">
              <Button size="lg" variant="secondary" className="flex-1" onClick={onCancel}>
                취소
              </Button>
              <Button size="lg" className="flex-1" onClick={handleNext}>
                다음
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Step 2: 상세정보 */}
      {currentStep === 2 && (
        <>
          <div className="pb-24">
            <Title size="xs" weight="bold" className="mb-6">
              Step 2. 상세정보
            </Title>

            <div className="flex flex-col gap-4">
              <LabeledInput
                label="제목"
                placeholder="제목을 입력해주세요"
                required={true}
                value={formData.title}
                onChange={(value) => onFormDataChange({ title: value })}
              />

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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">첨부파일 URL</span>
                  <Button size="sm" variant="secondary" onClick={onAddUrl}>
                    URL 추가
                  </Button>
                </div>
                {(formData.attachmentUrls || []).map((url, index) => (
                  <UrlInput
                    key={index}
                    value={url}
                    onChange={(value) => onUpdateUrl(index, value)}
                    onRemove={() => onRemoveUrl(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 하단 고정 버튼 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
            <div className="flex gap-3">
              <Button size="lg" variant="secondary" className="flex-1" onClick={handlePrevious}>
                이전
              </Button>
              <Button size="lg" className="flex-1" onClick={handleSubmit}>
                {isEditMode ? '수정하기' : '게시하기'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
