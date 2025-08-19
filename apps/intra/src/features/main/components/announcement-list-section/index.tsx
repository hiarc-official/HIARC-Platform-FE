'use client';

import { cn, Divider, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { AnnouncementListItem } from './announcement-list-item';
import { useRouter } from 'next/navigation';

interface AnnouncementListSectionProps {
  className?: string;
}

export function AnnouncementListSection({
  className,
}: AnnouncementListSectionProps): React.ReactElement {
  const tabItems = [
    { label: '공지사항', value: 'announcement' },
    { label: '알고리즘 소식', value: 'algorithm-news' },
  ];
  const [tab, setTab] = useState('announcement');
  const router = useRouter();

  return (
    <div className={cn('w-full', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} />
        <button
          onClick={() => {
            router.push('/announcement');
          }}
        >
          {'더보기 ->'}
        </button>
      </div>

      <Divider variant="horizontal" size="full" className="mt-4" />
      <div>
        <AnnouncementListItem title={'알고리즘 소식 1'} category={'RATING'} />
        <AnnouncementListItem title={'알고리즘 소식 1'} date={'2025.06.12'} category={'STUDY'} />
        <AnnouncementListItem title={'알고리즘 소식 1'} date={'2025.06.12'} category={'ETC'} />
      </div>
    </div>
  );
}
