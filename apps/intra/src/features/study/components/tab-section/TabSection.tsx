import { Button, cn, SlideFade, Tabs } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useLecturesByStudy } from '../../hooks/study-common/query/use-lectures';
import { useStudyAnnouncements } from '../../hooks/study-common/query/use-study-announcements';
import { useDownloadStudyMemberExcel } from '../../hooks/study-instructor/query/use-download-study-member-excel';
import { LectureListTab } from './LectureListTab';
import { StudyAnnouncementTab } from './StudyAnnouncementTab';
import { StudyMemberTab } from './StudyMemberTab';
import { useState } from 'react';

interface TabSectionProps {
  isStudent?: boolean;
  studyName?: string;
  studyId?: number;
  semesterId?: number;
  isAdmin?: boolean;
  isGroupStudy?: boolean;
  className?: string;
}

export function TabSection({
  className,
  studyName,
  isAdmin,
  studyId,
  semesterId,
  isStudent,
  isGroupStudy = true,
}: TabSectionProps): React.ReactElement {
  const router = useRouter();

  const tabs = [
    { label: '커리큘럼', value: 'curriculum' },
    { label: '공지사항', value: 'announcement' },
    ...(isAdmin ? [{ label: '스터디원 관리', value: 'manage_student' }] : []),
  ];

  const [selectedTab, setSelectedTab] = useState('curriculum');
  const { data: studyAnnouncements } = useStudyAnnouncements({
    studyId: studyId || 0,
    page: 0,
    size: 10,
  });
  const { data: lectureList } = useLecturesByStudy(studyId || 0);
  const downloadExcel = useDownloadStudyMemberExcel();

  const handleCurriculumAdd = (): void => {
    router.push(
      `/announcement/write?type=STUDY&studyId=${studyId}&semesterId=${semesterId}&isLecture=true`
    );
  };

  const handleAnnouncementAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}&semesterId=${semesterId}`);
  };

  const handleDownload = (): void => {
    if (studyId) {
      downloadExcel.mutate(studyId);
    }
  };

  return (
    <section className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full flex-col gap-3 md:flex-row md:justify-between md:gap-0">
        <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
        <div className="flex justify-end">
          {isAdmin && selectedTab === 'curriculum' && (
            <Button size="sm" className="bg-primary-200" onClick={handleCurriculumAdd}>
              강의 추가
            </Button>
          )}
          {isAdmin && selectedTab === 'announcement' && (
            <Button size="sm" className="bg-primary-200" onClick={handleAnnouncementAdd}>
              공지사항 추가
            </Button>
          )}
          {isAdmin && selectedTab === 'manage_student' && (
            <Button size="sm" variant="secondary" onClick={handleDownload}>
              명단 다운로드
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6 min-h-[300px]">
        {selectedTab === 'curriculum' && (
          <SlideFade key="curriculum" className="w-full">
            <LectureListTab
              isAdmin={isAdmin}
              isStudent={isStudent}
              studyId={studyId}
              lectureList={lectureList}
              studyName={studyName}
              semesterId={semesterId}
            />
          </SlideFade>
        )}
        {selectedTab === 'announcement' && (
          <SlideFade key="announcement" className="w-full">
            <StudyAnnouncementTab
              studyId={studyId}
              isInstructor={isAdmin}
              pageableModel={studyAnnouncements}
            />
          </SlideFade>
        )}
        {selectedTab === 'manage_student' && (
          <SlideFade key="manage_student" className="w-full">
            <StudyMemberTab studyId={studyId ?? 0} isGroupStudy={isGroupStudy} />
          </SlideFade>
        )}
      </div>
    </section>
  );
}
