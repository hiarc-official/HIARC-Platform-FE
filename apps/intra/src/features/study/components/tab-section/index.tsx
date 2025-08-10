import { cn, Tabs } from '@hiarc-platform/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LectureList } from './lecture-list';

import { StudentList } from './student-list';
import { StudyAnnouncementTable } from '../study-announcement-table';

interface TabSectionProps {
  isAdmin?: boolean;
  className?: string;
}

export function TabSection({ className, isAdmin }: TabSectionProps): React.ReactElement {
  const tabs = [
    { label: '커리큘럼', value: 'curriculum' },
    { label: '공지사항', value: 'announcement' },
    ...(isAdmin ? [{ label: '스터디원 관리', value: 'manage_student' }] : []),
  ];

  const [selectedTab, setSelectedTab] = useState('curriculum');

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
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
              <StudyAnnouncementTable />
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
