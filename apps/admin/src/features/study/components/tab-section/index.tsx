import { Button, cn, Tabs } from '@hiarc-platform/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LectureList } from './lecture-list';
import { AnnouncementTable } from './announcement-table';
import { StudentList } from './student-list';
import { useStudyAnnouncements } from '../../hooks/use-study-announcements';
import { useLecturesByStudy } from '../../hooks';
import { useStudyMembers } from '../../hooks/use-study-members';

interface TabSectionProps {
  studyId?: number;
  isAdmin?: boolean;
  className?: string;
}

export function TabSection({ className, isAdmin, studyId }: TabSectionProps): React.ReactElement {
  const router = useRouter();

  const tabs = [
    { label: '커리큘럼', value: 'curriculum' },
    { label: '공지사항', value: 'announcement' },
    ...(isAdmin ? [{ label: '스터디원 관리', value: 'manage_student' }] : []),
  ];

  const [selectedTab, setSelectedTab] = useState('curriculum');
  const { data: pageableModel } = useStudyAnnouncements({
    studyId: studyId || 0,
    page: 0,
    size: 10,
  });
  const { data: lectureList } = useLecturesByStudy(studyId || 0);
  const { data: studentList } = useStudyMembers(studyId || 0);

  const handleCurriculumAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}&isLecture=true`);
  };

  const handleAnnouncementAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}`);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
        {selectedTab === 'curriculum' && (
          <Button size="sm" className="bg-primary-200" onClick={handleCurriculumAdd}>
            강의 추가
          </Button>
        )}
        {selectedTab === 'announcement' && (
          <Button size="sm" className="bg-primary-200" onClick={handleAnnouncementAdd}>
            공지사항 추가
          </Button>
        )}
      </div>
      <div className="mt-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          {selectedTab === 'curriculum' && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <LectureList studyId={studyId} lectureList={lectureList} />
            </motion.div>
          )}
          {selectedTab === 'announcement' && (
            <motion.div
              key="announcement"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <AnnouncementTable pageableModel={pageableModel} />
            </motion.div>
          )}
          {selectedTab === 'manage_student' && (
            <motion.div
              key="manage_student"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <StudentList studentList={studentList || []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
