'use client';

import { NoticeSearchSection } from '@/features/notice/components/notice-search-section';
import { Notice, NoticeTable } from '@/features/notice/components/notice-table';
import { PageLayout, Title } from '@hiarc-platform/ui';

const noticeData: Notice[] = [
  { name: '피카츄', title: '첫 번째 공지사항', date: '2025.10.01', number: 1, category: 'general' },
  { name: '라이츄', title: '두 번째 공지사항', date: '2025.10.02', number: 2, category: 'study' },
  { name: '파이리', title: '세 번째 공지사항', date: '2025.10.03', number: 3, category: 'rating' },
  { name: '꼬부기', title: '네 번째 공지사항', date: '2025.10.04', number: 4, category: 'etc' },
  {
    name: '버터플',
    title: '다섯 번째 공지사항',
    date: '2025.10.05',
    number: 5,
    category: 'external',
  },
  {
    name: '야도란',
    title: '여섯 번째 공지사항',
    date: '2025.10.06',
    number: 6,
    category: 'general',
  },
  {
    name: '피죤투',
    title: '일곱 번째 공지사항',
    date: '2025.10.06',
    number: 7,
    category: 'general',
  },
  {
    name: '또가스',
    title: '여덟 번째 공지사항',
    date: '2025.10.06',
    number: 8,
    category: 'general',
  },
  {
    name: '아보',
    title: '아홉 번째 공지사항',
    date: '2025.10.06',
    number: 9,
    category: 'general',
  },
  {
    name: '이상해씨',
    title: '열 번째 공지사항',
    date: '2025.10.06',
    number: 10,
    category: 'general',
  },
];

export default function NoticeList(): React.ReactElement {
  return (
    <PageLayout>
      <Title size="sm" weight="bold">
        공지사항
      </Title>
      <NoticeSearchSection className="mt-6" />
      <NoticeTable className="mt-8" data={noticeData} />
    </PageLayout>
  );
}
