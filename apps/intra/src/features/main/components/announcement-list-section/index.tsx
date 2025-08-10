'use client';

import { cn, Divider, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { AnnouncementListItem } from './announcement-list-item';

interface AnnouncementListSectionProps {
  className?: string;
}

export function AnnouncementListSection({ className }: AnnouncementListSectionProps): React.ReactElement {
  const tabItems = [
    { label: '공지사항', value: 'announcement' },
    { label: '알고리즘 소식', value: 'algorithm-news' },
  ];
  const [tab, setTab] = useState('announcement');

  return (
    <div className={cn('w-full', className)}>
      <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} />
      <Divider variant="horizontal" size="full" className="mt-4" />
      <div>
        <AnnouncementListItem title={'알고리즘 소식 1'} category={'rating'} />
        <AnnouncementListItem title={'알고리즘 소식 1'} date={'2025.06.12'} category={'study'} />
        <AnnouncementListItem title={'알고리즘 소식 1'} date={'2025.06.12'} category={'etc'} />
      </div>
    </div>
  );
}