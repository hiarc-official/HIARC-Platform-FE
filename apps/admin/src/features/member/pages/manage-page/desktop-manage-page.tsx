'use client';
import { cn, Tabs, SlideFade } from '@hiarc-platform/ui';
import { CurrentSemesterSection } from '../../components/manage-tab-section/current-semester-section';
import { RecruitManageSection } from '../../components/manage-tab-section/recruit-manage-section';
import { useManagePageState } from '../../hooks/page/use-manage-page-state';

interface DesktopManagePageProps {
  className?: string;
}

export function DesktopManagePage({ className }: DesktopManagePageProps): React.ReactElement {
  const { tabs, selectedTab, setSelectedTab } = useManagePageState();

  return (
    <div className={cn('mt-4 flex w-full flex-col', className)}>
      <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
      <div className="mt-6 min-h-[300px]">
        {selectedTab === 'member_list_section' && (
          <SlideFade key="current_semester_list" className="w-full">
            <CurrentSemesterSection />
          </SlideFade>
        )}
        {selectedTab === 'recruit_manage_section' && (
          <SlideFade key="recruit_manage_section" className="w-full">
            <RecruitManageSection />
          </SlideFade>
        )}
      </div>
    </div>
  );
}
