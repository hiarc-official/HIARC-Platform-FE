'use client';

import { Divider, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { NoticeListItem } from './notice-list-item';

export function NoticeListSection(): React.ReactElement {
  const tabItems = [
    { label: '공지사항', value: 'notice' },
    { label: '알고리즘 소식', value: 'algorithm-news' },
  ];
  const [tab, setTab] = useState('notice');

  return (
    <div className="w-full">
      <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} />
      <Divider variant="horizontal" size="full" className="mt-4" />
      <div>
        <NoticeListItem title={'알고리즘 소식 1'} category={'rating'} />
        <NoticeListItem title={'알고리즘 소식 1'} date={'2025.06.12'} category={'study'} />
        <NoticeListItem title={'알고리즘 소식 1'} date={'2025.06.12'} category={'etc'} />
      </div>
    </div>
  );
}
