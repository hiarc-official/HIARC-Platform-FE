'use client';
import { cn, Tabs } from '@hiarc-platform/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { CurrentSemesterSection } from './current-semester-section';
import { PreviousSemesterSection } from './previous-semester-section';
import { RecruitManageSection } from './recruit-manage-section';

interface TabSectionProps {
  isAdmin?: boolean;
  className?: string;
}

export function ManageTabSection({ className }: TabSectionProps): React.ReactElement {
  const tabs = [
    { label: '학회원 명단', value: 'member_list_section' },
    { label: '모집관리', value: 'recruit_manage_section' },
    { label: '이전 학기 명단', value: 'previous_semester_section' },
  ];

  const [selectedTab, setSelectedTab] = useState('member_list_section');

  return (
    <div className={cn('mt-4 flex w-full flex-col', className)}>
      <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
      <div className="mt-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          {selectedTab === 'member_list_section' && (
            <motion.div
              key="current_semester_list"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <CurrentSemesterSection />
            </motion.div>
          )}
          {selectedTab === 'recruit_manage_section' && (
            <motion.div
              key="current_semester_list"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <RecruitManageSection />
            </motion.div>
          )}

          {selectedTab === 'previous_semester_section' && (
            <motion.div
              key="current_semester_list"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <PreviousSemesterSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
