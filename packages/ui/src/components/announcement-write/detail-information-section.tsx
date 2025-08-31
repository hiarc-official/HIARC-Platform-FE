'use client';

import { useState, useEffect } from 'react';
import { SideBar } from './side-bar';
import { Announcement, SelectOption, CreateAnnouncementForm, ImageSource } from '@hiarc-platform/shared';
import { UrlInput } from './url-input';
import { Button } from '../button';
import { LabeledCalanderInput } from '../input/labeled-calander-input';
import { LabeledInput } from '../input/labeled-input';
import { LabeledTextarea } from '../input/labeled-textarea';
import { DialogUtil } from '../../utils/dialog-util';
import { LabeledImageInput } from '../input/labeled-image-input';

interface DetailInformationSectionProps {
  announcementId?: number;
  announcement?: Announcement;
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  initialStudyAnnounceType?: '일반' | '회차별 공지';
  studyOptions?: SelectOption[];
  disableCategoryChange?: boolean;
  disableStudyTypeChange?: boolean;
  onSubmit?(data: CreateAnnouncementForm, isEditMode: boolean, announcementId?: number): void;
}

export default function DetailInformationSection({
  announcementId,
  announcement,
  initialAnnouncementType = 'GENERAL',
  initialStudyId,
  initialStudyAnnounceType = '일반',
  studyOptions = [],
  disableCategoryChange = false,
  disableStudyTypeChange = false,
  onSubmit,
}: DetailInformationSectionProps): React.ReactElement {
  const isEditMode = Boolean(announcementId);

  // CreateAnnouncementRequest 상태
  const [formData, setFormData] = useState<CreateAnnouncementForm & {
    publicType?: '공개' | '비공개';
    studyAnnounceType?: '일반' | '회차별 공지';
    applyType?: '신청 없음' | '신청 유형';
  }>({
    title: '',
    place: undefined,
    scheduleStartAt: undefined,
    scheduleEndAt: undefined,
    content: '',
    announcementType: initialAnnouncementType,
    isPublic: true,
    attachmentUrls: [],
    images: [],
    studyId: initialStudyId,
    lectureRound: undefined,
    applicationUrl: undefined,
    applicationStartAt: undefined,
    applicationEndAt: undefined,
    publicType: '공개',
    studyAnnounceType: initialStudyAnnounceType,
    applyType: '신청 없음',
  });

  // 공지사항 데이터로 폼 초기화 (수정 모드일 때)
  useEffect(() => {
    if (isEditMode && announcement) {
      setFormData({
        title: announcement.title || '',
        place: announcement.place || undefined,
        scheduleStartAt: announcement.scheduleStartAt,
        scheduleEndAt: announcement.scheduleEndAt,
        content: announcement.content || '',
        announcementType: announcement.announcementType || 'GENERAL',
        isPublic: announcement.isPublic ?? true,
        attachmentUrls: announcement.attachmentUrls?.filter((url) => url.trim() !== '') || [],
        images: [],
        imageSources: announcement.imageUrls,
        studyId: announcement.studyId,
        lectureRound: announcement.lectureRound,
        applicationUrl: announcement.applicationUrl,
        applicationStartAt: announcement.applicationStartAt,
        applicationEndAt: announcement.applicationEndAt,
        publicType: announcement.isPublic ? '공개' : '비공개',
        studyAnnounceType: announcement.lectureRound ? '회차별 공지' : '일반',
        applyType: (announcement.applicationUrl || announcement.applicationStartAt || announcement.applicationEndAt) ? '신청 유형' : '신청 없음',
      });
    }
  }, [isEditMode, announcement]);

  // URL 관리 함수
  const addUrl = (): void => {
    setFormData((prev) => ({ ...prev, attachmentUrls: [...(prev.attachmentUrls || []), ''] }));
  };

  const updateUrl = (index: number, value: string): void => {
    const newUrls = [...(formData.attachmentUrls || [])];
    newUrls[index] = value;
    setFormData((prev) => ({ ...prev, attachmentUrls: newUrls }));
  };

  const removeUrl = (index: number): void => {
    const currentUrls = formData.attachmentUrls || [];
    if (currentUrls.length > 1) {
      const newUrls = currentUrls.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, attachmentUrls: newUrls }));
    }
  };

  // 이미지 관리 함수
  const handleImageChange = (images: File[]): void => {
    console.log('새 이미지 변경됨:', images);
    setFormData((prev) => ({
      ...prev,
      images: [...images] // 배열 복사로 순서 보장
    }));
  };

  const handleExistingImageChange = (images: ImageSource[]): void => {
    console.log('기존 이미지 변경됨:', images);
    setFormData((prev) => ({
      ...prev,
      imageSources: [...images] // 배열 복사로 순서 보장
    }));
  };

  // formData 업데이트 헬퍼 함수
  const updateFormData = (updates: Partial<CreateAnnouncementForm & {
    publicType?: '공개' | '비공개';
    studyAnnounceType?: '일반' | '회차별 공지';
    applyType?: '신청 없음' | '신청 유형';
  }>): void => {
    console.log('updateFormData 호출됨:', updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log('업데이트된 formData:', newData);
      return newData;
    });
  };

  // 날짜를 YYYY-MM-DD 형태로 포맷하는 헬퍼 함수
  const formatDateToLocalString = (date: Date | string | undefined): string | undefined => {
    if (!date) {return undefined;}
    
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {return undefined;}
    
    // 로컬 시간대 기준으로 YYYY-MM-DD 형식 생성
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 날짜시간을 로컬 시간대 기준 ISO 문자열로 변환하는 헬퍼 함수
  const formatDateTimeToLocalISOString = (date: Date | string | undefined): string | undefined => {
    if (!date) {return undefined;}
    
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {return undefined;}
    
    // 로컬 시간대 오프셋을 계산
    const timezoneOffset = dateObj.getTimezoneOffset() * 60000; // 밀리초로 변환
    // 로컬 시간에서 오프셋을 빼서 UTC 기준으로 조정 (실제로는 로컬 시간 유지)
    const localDate = new Date(dateObj.getTime() - timezoneOffset);
    return localDate.toISOString();
  };

  // 폼 제출 함수
  const handleSubmit = (): void => {
    console.log('폼 제출 시 formData:', formData);
    if (!formData.title.trim() || !formData.content.trim() || !formData.announcementType) {
      DialogUtil.showError('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 신청 유형이 선택된 경우 필수 입력 검증
    if (formData.applyType === '신청 유형') {
      if (!formData.applicationStartAt || !formData.applicationEndAt || !formData.applicationUrl?.trim()) {
        DialogUtil.showError(
          '신청 유형을 선택한 경우 신청 시작일, 신청 종료일, 신청 URL을 모두 입력해주세요.'
        );
        return;
      }
    }

    // 최종 데이터 정리 - 순서를 보장하기 위해 명시적으로 필드 설정
    const requestData: CreateAnnouncementForm = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      place: formData.place?.trim() || undefined,
      scheduleStartAt: formatDateTimeToLocalISOString(formData.scheduleStartAt),
      scheduleEndAt: formatDateTimeToLocalISOString(formData.scheduleEndAt),
      announcementType: formData.announcementType,
      isPublic: formData.publicType === '공개',
      attachmentUrls: (formData.attachmentUrls || []).filter((url) => url.trim() !== ''),
      images: formData.images || [],
      imageSources: formData.imageSources || [], // 기존 이미지 순서 보장
      studyId: formData.studyId,
      lectureRound: formData.lectureRound,
      applicationUrl: formData.applicationUrl?.trim() || null,
      applicationStartAt: formatDateToLocalString(formData.applicationStartAt || undefined) || null,
      applicationEndAt: formatDateToLocalString(formData.applicationEndAt || undefined) || null,
    };

    // STUDY 카테고리일 때만 회차별 공지 처리
    if (formData.announcementType === 'STUDY') {
      if (formData.studyAnnounceType !== '회차별 공지') {
        requestData.lectureRound = undefined;
      }
    }

    // 콜백 호출
    if (onSubmit) {
      onSubmit(requestData, isEditMode, announcementId);
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-4">
          <LabeledInput
            label="제목"
            placeholder="제목을 입력해주세요"
            required={true}
            value={formData.title}
            onChange={(value) => updateFormData({ title: value })}
          />
          <div className="flex gap-4">
            <LabeledInput
              label="장소"
              placeholder="장소를 입력해주세요"
              value={formData.place || ''}
              onChange={(value) => updateFormData({ place: value || undefined })}
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
                  updateFormData({ scheduleStartAt: value || undefined });
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
            onChange={(value) => updateFormData({ content: value })}
          />
          <LabeledImageInput
            label="이미지"
            value={formData.images || []}
            existingImages={formData.imageSources || []}
            onChange={handleImageChange}
            onExistingImagesChange={handleExistingImageChange}
          />

          <div className="flex flex-col gap-2">
            {(formData.attachmentUrls || []).map((url, index) => (
              <UrlInput
                key={index}
                value={url}
                onChange={(value) => updateUrl(index, value)}
                onRemove={() => removeUrl(index)}
              />
            ))}
          </div>
        </div>

        <SideBar
          formData={formData}
          onFormDataChange={updateFormData}
          studyOptions={studyOptions}
          disableCategoryChange={disableCategoryChange}
          disableStudyTypeChange={disableStudyTypeChange}
          onSubmit={handleSubmit}
          isLoading={false}
          buttonText={isEditMode ? '수정하기' : '게시하기'}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button size="md" className="w-[112px]" variant="fill_secondary" onClick={addUrl}>
          URL 추가
        </Button>
      </div>
    </div>
  );
}
