'use client';

import { MobileAnnouncementWrite } from './mobile-announcement-write';
import { DesktopAnnouncementWrite } from './desktop-announcement-write';
import { Announcement, SelectOption, CreateAnnouncementForm } from '@hiarc-platform/shared';
import { useAnnouncementForm } from '../../hooks/use-announcement-form';

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
  onCancel?(): void;
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
  onCancel,
}: DetailInformationSectionProps): React.ReactElement {
  const {
    formData,
    isEditMode,
    currentStep,
    setCurrentStep,
    addUrl,
    updateUrl,
    removeUrl,
    handleImageChange,
    handleExistingImageChange,
    updateFormData,
    handleSubmit,
  } = useAnnouncementForm({
    announcementId,
    announcement,
    initialAnnouncementType,
    initialStudyId,
    initialStudyAnnounceType,
    onSubmit,
  });

  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            {/* 모바일 뷰 */}
            <div className="block pt-12 md:hidden">
              <MobileAnnouncementWrite
                formData={formData}
                studyOptions={studyOptions}
                disableCategoryChange={disableCategoryChange}
                disableStudyTypeChange={disableStudyTypeChange}
                isEditMode={isEditMode}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                onFormDataChange={updateFormData}
                onSubmit={handleSubmit}
                onCancel={onCancel}
                onAddUrl={addUrl}
                onUpdateUrl={updateUrl}
                onRemoveUrl={removeUrl}
                onImageChange={handleImageChange}
                onExistingImageChange={handleExistingImageChange}
              />
            </div>

            {/* 데스크톱 뷰 */}
            <div className="hidden md:block">
              <DesktopAnnouncementWrite
                formData={formData}
                studyOptions={studyOptions}
                disableCategoryChange={disableCategoryChange}
                disableStudyTypeChange={disableStudyTypeChange}
                isEditMode={isEditMode}
                onFormDataChange={updateFormData}
                onSubmit={handleSubmit}
                onAddUrl={addUrl}
                onUpdateUrl={updateUrl}
                onRemoveUrl={removeUrl}
                onImageChange={handleImageChange}
                onExistingImageChange={handleExistingImageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
