'use client';
import { DialogUtil, LabeledInput, LabeledTextarea } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import LabeledImageInput from '@/shared/components/labeled-image-input';
import { LabeledCalanderInput } from '@hiarc-platform/ui';
import { useState, useEffect } from 'react';
import { SideBar } from './side-bar';
import { useCreateAdminAnnouncement } from '@/features/announcement/hooks/use-create-admin-announcement';
import { useAdminAnnouncement } from '@/features/announcement/hooks/use-admin-announcement';
import { useUpdateAdminAnnouncement } from '@/features/announcement/hooks/use-update-admin-announcement';
import { LoadingDots } from '@hiarc-platform/ui';
import { CreateAnnouncementRequest } from '@/features/announcement/types/request/create-announcement-request';
import { useRouter } from 'next/navigation';
import { UrlInput } from './url-input';

interface DetailInformationSectionProps {
  announcementId?: number;
}

export default function DetailInformationSection({
  announcementId,
}: DetailInformationSectionProps): React.ReactElement {
  const router = useRouter();
  const isEditMode = Boolean(announcementId);

  // 훅들
  const {
    data: announcement,
    isLoading: isLoadingAnnouncement,
    error,
  } = useAdminAnnouncement(announcementId || 0);
  const { mutate: createAnnouncement, isPending: isCreating } = useCreateAdminAnnouncement();
  const { mutate: updateAnnouncement, isPending: isUpdating } = useUpdateAdminAnnouncement();

  const isLoading = isCreating || isUpdating;

  // 기본 폼 데이터
  const [title, setTitle] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [scheduleStartAt, setScheduleStartAt] = useState<Date | null>(null);
  const [scheduleEndAt, setScheduleEndAt] = useState<Date | null>(null);
  const [content, setContent] = useState<string>('');
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>(['']);

  // SideBar 관련 상태
  const [category, setCategory] = useState<string>('');
  const [studyId, setStudyId] = useState<number | undefined>();
  const [applyType, setApplyType] = useState<string>('신청 없음');
  const [studyAnnounceType, setStudyAnnounceType] = useState<string>('일반');
  const [lectureRound, setLectureRound] = useState<number | undefined>();
  const [publicType, setPublicType] = useState<string>('공개');
  const [applicationStartDate, setApplicationStartDate] = useState<Date | null>(null);
  const [applicationEndDate, setApplicationEndDate] = useState<Date | null>(null);
  const [applicationUrl, setApplicationUrl] = useState<string>('');

  // 공지사항 데이터로 폼 초기화 (수정 모드일 때)
  useEffect(() => {
    if (isEditMode && announcement) {
      setTitle(announcement.title || '');
      setPlace(announcement.place || '');
      setScheduleStartAt(announcement.scheduleStartAt || null);
      setScheduleEndAt(announcement.scheduleEndAt || null);
      setContent(announcement.content || '');
      setAttachmentUrls(announcement.attachmentUrls?.length ? announcement.attachmentUrls : ['']);

      setCategory(announcement.announcementType || '');
      setStudyId(announcement.studyId || undefined);
      setPublicType(announcement.isPublic ? '공개' : '비공개');
      setApplicationUrl(announcement.applicationUrl || '');
      setLectureRound(announcement.lectureRound || undefined);

      // 날짜 파싱
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

  // 폼 제출 함수
  const handleSubmit = (): void => {
    if (!title.trim() || !content.trim() || !category) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const requestData: CreateAnnouncementRequest = {
      title: title.trim(),
      place: place.trim() || undefined,
      scheduleStartAt: scheduleStartAt?.toISOString(),
      scheduleEndAt: scheduleStartAt?.toISOString(),
      content: content.trim(),
      announcementType: category as 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL',
      isPublic: publicType === '공개',
      attachmentUrls: attachmentUrls.filter((url) => url.trim() !== ''),
    };

    // STUDY 카테고리일 때 추가 필드
    if (category === 'STUDY') {
      if (studyId) {
        requestData.studyId = studyId;
      }
      if (studyAnnounceType === '회차별 공지' && lectureRound) {
        requestData.lectureRound = lectureRound;
      }
    } else {
      // 다른 카테고리에서 신청 관련 필드
      if (applyType === '신청 유형') {
        requestData.applicationUrl = applicationUrl.trim() || undefined;
        requestData.applicationStartAt = applicationStartDate?.toISOString();
        requestData.applicationEndAt = applicationEndDate?.toISOString();
      }
    }

    if (isEditMode && announcementId) {
      // 수정 모드
      updateAnnouncement(
        { id: announcementId, data: requestData },
        {
          onSuccess: () => {
            DialogUtil.showSuccess('공지사항이 성공적으로 수정되었습니다.', undefined, () => {
              router.back();
            });
          },
          onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : '수정에 실패했습니다.';
            DialogUtil.showError(errorMessage);
          },
        }
      );
    } else {
      // 생성 모드
      createAnnouncement(requestData, {
        onSuccess: () => {
          DialogUtil.showSuccess('공지사항이 성공적으로 등록되었습니다.', undefined, () => {
            router.back();
          });
        },
        onError: (error) => {
          const errorMessage = error instanceof Error ? error.message : '등록에 실패했습니다.';
          DialogUtil.showError(errorMessage);
        },
      });
    }
  };

  // 수정 모드에서 로딩 중일 때
  if (isEditMode && isLoadingAnnouncement) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  // 수정 모드에서 에러가 발생했을 때
  if (isEditMode && error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-4">
          <LabeledInput
            label="제목"
            placeholder="제목을 입력해주세요"
            required={true}
            value={title}
            onChange={(value) => setTitle(value)}
          />
          <div className="flex gap-4">
            <LabeledInput
              label="장소"
              placeholder="장소를 입력해주세요"
              value={place}
              onChange={(value) => setPlace(value)}
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
            <LabeledCalanderInput
              placeholder="종료 일시를 선택해주세요"
              label="종료 일시"
              value={scheduleEndAt}
              showTimeSelect={true}
              timeIntervals={30}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setScheduleEndAt(val);
                }
              }}
            />
          </div>
          <LabeledTextarea
            label="본문"
            placeholder="내용을 입력해주세요."
            required={true}
            className="aspect-[2/1] text-lg"
            value={content}
            onChange={(value) => setContent(value)}
          />
          <LabeledImageInput label="이미지" />

          {/* URL 입력 필드들 */}
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
          category={category}
          onCategoryChange={setCategory}
          studyId={studyId}
          onStudyIdChange={setStudyId}
          applyType={applyType}
          onApplyTypeChange={setApplyType}
          studyAnnounceType={studyAnnounceType}
          onStudyAnnounceTypeChange={setStudyAnnounceType}
          lectureRound={lectureRound}
          onLectureRoundChange={setLectureRound}
          publicType={publicType}
          onPublicTypeChange={setPublicType}
          applicationStartDate={applicationStartDate}
          onApplicationStartDateChange={setApplicationStartDate}
          applicationEndDate={applicationEndDate}
          onApplicationEndDateChange={setApplicationEndDate}
          applicationUrl={applicationUrl}
          onApplicationUrlChange={setApplicationUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
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
