import { Button, cn, Tabs } from '@hiarc-platform/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LectureList } from './lecture-list';
import { AnnouncementTable } from './announcement-table';
import { StudentList } from './student-list';
import { useStudyAnnouncements } from '../../hooks/use-study-announcements';

interface TabSectionProps {
  isAdmin?: boolean;
  className?: string;
}

export function TabSection({ className, isAdmin }: TabSectionProps): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const studyId = typeof params.id === 'string' ? Number(params.id) : 1;

  const tabs = [
    { label: '커리큘럼', value: 'curriculum' },
    { label: '공지사항', value: 'announcement' },
    ...(isAdmin ? [{ label: '스터디원 관리', value: 'manage_student' }] : []),
  ];

  const [selectedTab, setSelectedTab] = useState('manage_student');
  const { data: pageableModel } = useStudyAnnouncements({
    studyId: studyId,
    page: 0,
    size: 10,
  });

  const handleAnnouncementAdd = (): void => {
    router.push(`/study/${studyId}/announcement-create`);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
        <Button size="sm" className="bg-primary-200" onClick={handleAnnouncementAdd}>
          공지사항 추가
        </Button>
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
              <LectureList />
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
              <StudentList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
