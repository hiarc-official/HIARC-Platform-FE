'use client';

import { useState, useEffect } from 'react';
import { SideBar } from './side-bar';
import { CreateAnnouncementRequest, Announcement, SelectOption } from '@hiarc-platform/shared';
import { UrlInput } from './url-input';

import { Button } from '../button';
import { LabeledCalanderInput } from '../input/labeled-calander-input';
import { LabeledInput } from '../input/labeled-input';
import { LabeledTextarea } from '../input/labeled-textarea';

interface DetailInformationSectionProps {
  announcementId?: number;
  announcement?: Announcement;
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  initialStudyAnnounceType?: '일반' | '회차별 공지';
  studyOptions?: SelectOption[];
  disableCategoryChange?: boolean;
  disableStudyTypeChange?: boolean;
  onSubmit?(data: CreateAnnouncementRequest, isEditMode: boolean, announcementId?: number): void;
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
  const [formData, setFormData] = useState<CreateAnnouncementRequest>({
    title: '',
    place: undefined,
    scheduleStartAt: undefined,
    scheduleEndAt: undefined,
    content: '',
    announcementType: initialAnnouncementType,
    isPublic: true,
    attachmentUrls: [],
    studyId: initialStudyId,
    lectureRound: undefined,
    applicationUrl: undefined,
    applicationStartAt: undefined,
    applicationEndAt: undefined,
  });

  // UI 관련 상태
  const [applyType, setApplyType] = useState<string>('신청 없음');
  const [studyAnnounceType, setStudyAnnounceType] = useState<string>(initialStudyAnnounceType);
  const [publicType, setPublicType] = useState<string>('공개');
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>(['']);
  const [scheduleStartAt, setScheduleStartAt] = useState<Date | null>(null);
  const [scheduleEndAt, setScheduleEndAt] = useState<Date | null>(null);
  const [applicationStartDate, setApplicationStartDate] = useState<Date | null>(null);
  const [applicationEndDate, setApplicationEndDate] = useState<Date | null>(null);

  // 공지사항 데이터로 폼 초기화 (수정 모드일 때)
  useEffect(() => {
    if (isEditMode && announcement) {
      setFormData({
        title: announcement.title || '',
        place: announcement.place || undefined,
        scheduleStartAt: announcement.scheduleStartAt
          ? announcement.scheduleStartAt instanceof Date
            ? announcement.scheduleStartAt.toISOString()
            : announcement.scheduleStartAt
          : undefined,
        scheduleEndAt: announcement.scheduleEndAt
          ? announcement.scheduleEndAt instanceof Date
            ? announcement.scheduleEndAt.toISOString()
            : announcement.scheduleEndAt
          : undefined,
        content: announcement.content || '',
        announcementType: announcement.announcementType || 'GENERAL',
        isPublic: announcement.isPublic ?? true,
        attachmentUrls: announcement.attachmentUrls?.filter((url) => url.trim() !== '') || [],
        studyId: announcement.studyId,
        lectureRound: announcement.lectureRound,
        applicationUrl: announcement.applicationUrl,
        applicationStartAt: announcement.applicationStartAt
          ? announcement.applicationStartAt instanceof Date
            ? announcement.applicationStartAt.toISOString()
            : announcement.applicationStartAt
          : undefined,
        applicationEndAt: announcement.applicationEndAt
          ? announcement.applicationEndAt instanceof Date
            ? announcement.applicationEndAt.toISOString()
            : announcement.applicationEndAt
          : undefined,
      });

      // UI 상태들 설정
      setAttachmentUrls(announcement.attachmentUrls?.length ? announcement.attachmentUrls : ['']);
      setPublicType(announcement.isPublic ? '공개' : '비공개');

      // 날짜 파싱
      if (announcement.scheduleStartAt) {
        setScheduleStartAt(new Date(announcement.scheduleStartAt));
      }
      if (announcement.scheduleEndAt) {
        setScheduleEndAt(new Date(announcement.scheduleEndAt));
      }
      if (announcement.applicationStartAt) {
        setApplicationStartDate(new Date(announcement.applicationStartAt));
      }
      if (announcement.applicationEndAt) {
        setApplicationEndDate(new Date(announcement.applicationEndAt));
      }

      // 신청 유형 설정
      if (
        announcement.applicationUrl ||
        announcement.applicationStartAt ||
        announcement.applicationEndAt
      ) {
        setApplyType('신청 유형');
      } else {
        setApplyType('신청 없음');
      }

      // 스터디 공지 유형 설정
      if (announcement.lectureRound) {
        setStudyAnnounceType('회차별 공지');
      } else {
        setStudyAnnounceType('일반');
      }
    }
  }, [isEditMode, announcement]);

  // URL 관리 함수
  const addUrl = (): void => {
    setAttachmentUrls([...attachmentUrls, '']);
  };

  const updateUrl = (index: number, value: string): void => {
    const newUrls = [...attachmentUrls];
    newUrls[index] = value;
    setAttachmentUrls(newUrls);
  };

  const removeUrl = (index: number): void => {
    if (attachmentUrls.length > 1) {
      const newUrls = attachmentUrls.filter((_, i) => i !== index);
      setAttachmentUrls(newUrls);
    }
  };

  // formData 업데이트 헬퍼 함수
  const updateFormData = (updates: Partial<CreateAnnouncementRequest>): void => {
    console.log('updateFormData 호출됨:', updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log('업데이트된 formData:', newData);
      return newData;
    });
  };

  // 폼 제출 함수
  const handleSubmit = (): void => {
    console.log('폼 제출 시 formData:', formData);
    if (!formData.title.trim() || !formData.content.trim() || !formData.announcementType) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 최종 데이터 정리
    const requestData: CreateAnnouncementRequest = {
      ...formData,
      title: formData.title.trim(),
      content: formData.content.trim(),
      place: formData.place?.trim() || undefined,
      scheduleStartAt: scheduleStartAt?.toISOString() || undefined,
      scheduleEndAt: scheduleEndAt?.toISOString() || undefined,
      isPublic: publicType === '공개',
      attachmentUrls: attachmentUrls.filter((url) => url.trim() !== ''),
    };

    // STUDY 카테고리일 때 추가 필드
    if (formData.announcementType === 'STUDY') {
      if (studyAnnounceType === '회차별 공지') {
        requestData.lectureRound = formData.lectureRound;
      } else {
        requestData.lectureRound = undefined;
      }
    } else {
      // 다른 카테고리에서 신청 관련 필드
      if (applyType === '신청 유형') {
        requestData.applicationUrl = formData.applicationUrl?.trim() || undefined;
        requestData.applicationStartAt = applicationStartDate?.toISOString() || undefined;
        requestData.applicationEndAt = applicationEndDate?.toISOString() || undefined;
      } else {
        requestData.applicationUrl = undefined;
        requestData.applicationStartAt = undefined;
        requestData.applicationEndAt = undefined;
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
              value={scheduleStartAt}
              showTimeSelect={true}
              timeIntervals={30}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setScheduleStartAt(val);
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
          {/* <LabeledImageInput label="이미지" /> */}

          <div className="flex flex-col gap-2">
            {attachmentUrls.map((url, index) => (
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
          applyType={applyType}
          onApplyTypeChange={setApplyType}
          studyAnnounceType={studyAnnounceType}
          onStudyAnnounceTypeChange={setStudyAnnounceType}
          publicType={publicType}
          onPublicTypeChange={setPublicType}
          applicationStartDate={applicationStartDate}
          onApplicationStartDateChange={setApplicationStartDate}
          applicationEndDate={applicationEndDate}
          onApplicationEndDateChange={setApplicationEndDate}
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
