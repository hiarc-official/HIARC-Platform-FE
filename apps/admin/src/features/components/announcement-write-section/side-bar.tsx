'use client';

import {
  LabeledSelector,
  LabeledSelectButton,
  LabeledInput,
  LabeledCalanderInput,
} from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import { Button } from '@hiarc-platform/ui';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';

interface SideBarProps {
  formData: CreateAnnouncementRequest;
  onFormDataChange(updates: Partial<CreateAnnouncementRequest>): void;
  applyType: string;
  onApplyTypeChange(value: string): void;
  studyAnnounceType: string;
  onStudyAnnounceTypeChange(value: string): void;
  publicType: string;
  onPublicTypeChange(value: string): void;
  applicationStartDate: Date | null;
  onApplicationStartDateChange(value: Date | null): void;
  applicationEndDate: Date | null;
  onApplicationEndDateChange(value: Date | null): void;
  onSubmit(): void;
  isLoading: boolean;
  buttonText?: string;
}

export function SideBar({
  formData,
  onFormDataChange,
  applyType,
  onApplyTypeChange,
  studyAnnounceType,
  onStudyAnnounceTypeChange,
  publicType,
  onPublicTypeChange,
  applicationStartDate,
  onApplicationStartDateChange,
  applicationEndDate,
  onApplicationEndDateChange,
  onSubmit,
  isLoading,
  buttonText = '게시하기',
}: SideBarProps): React.ReactElement {
  const publicTypeOptionList = [
    {
      value: '공개',
      label: '공개',
    },
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

  return (
    <div className="flex w-[389px] flex-col justify-between rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col gap-4">
        {/* 카테고리 선택 */}
        <div className="flex flex-col gap-2">
          <LabeledSelector
            placeholder="카테고리를 선택해주세요."
            options={selectOption['카테고리']}
            label="카테고리"
            value={formData.announcementType}
            onChange={(value) => onFormDataChange({ announcementType: value as 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' })}
          />

          {/* STUDY 카테고리일 때 스터디 선택 */}
          {formData.announcementType === 'STUDY' && (
            <LabeledSelector
              placeholder="스터디를 선택해주세요."
              options={selectOption['스터디']}
              label="스터디선택"
              showLabel={false}
              value={formData.studyId?.toString() || ''}
              onChange={(value: string) => onFormDataChange({ studyId: value ? Number(value) : undefined })}
            />
          )}
        </div>

        {/* STUDY 카테고리일 때 */}
        {formData.announcementType === 'STUDY' ? (
          <>
            {/* 스터디 공지 유형 */}
            <LabeledSelectButton
              label="스터디 공지 유형"
              required={true}
              value={studyAnnounceType}
              options={studyAnnounceTypeOptionList}
              onChange={onStudyAnnounceTypeChange}
            />

            {/* 회차별 공지를 선택했을 때 회차 선택 */}
            {studyAnnounceType === '회차별 공지' && (
              <LabeledSelector
                placeholder="회차를 선택해주세요."
                options={selectOption['회차']}
                label="회차 선택"
                required
                value={formData.lectureRound?.toString() || ''}
                onChange={(value: string) =>
                  onFormDataChange({ lectureRound: value ? Number(value) : undefined })
                }
              />
            )}
          </>
        ) : (
          <>
            {/* 다른 카테고리일 때 신청 유형 */}
            <LabeledSelectButton
              label="신청 유형"
              required
              value={applyType}
              options={applyTypeOptionList}
              onChange={onApplyTypeChange}
            />

            {/* 신청 유형을 선택했을 때 (신청 없음이 아닐 때) */}
            {applyType === '신청 유형' && (
              <>
                <LabeledCalanderInput
                  placeholder="신청 시작일을 선택해주세요"
                  label="신청 시작일"
                  required
                  value={applicationStartDate}
                  onChange={(val) => {
                    if (!Array.isArray(val)) {
                      onApplicationStartDateChange(val);
                    }
                  }}
                />
                <LabeledCalanderInput
                  placeholder="신청 종료일을 선택해주세요"
                  label="신청 종료일"
                  required
                  value={applicationEndDate}
                  onChange={(val) => {
                    if (!Array.isArray(val)) {
                      onApplicationEndDateChange(val);
                    }
                  }}
                />
                <LabeledInput
                  label="신청 URL"
                  placeholder="신청 URL을 입력해주세요"
                  value={formData.applicationUrl || ''}
                  onChange={(value) => onFormDataChange({ applicationUrl: value || undefined })}
                />
              </>
            )}
          </>
        )}

        {/* 공개 여부 - 항상 맨 아래 표시 */}
        <LabeledSelectButton
          label="공개 여부"
          required
          value={publicType}
          options={publicTypeOptionList}
          onChange={onPublicTypeChange}
        />
      </div>

      <Button className="mt-4 w-full" size="lg" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? (buttonText === '수정하기' ? '수정 중...' : '게시 중...') : buttonText}
      </Button>
    </div>
  );
}
