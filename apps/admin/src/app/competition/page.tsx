'use client';
import { Title } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@hiarc-platform/ui';
import { CompetitionTable } from '@/features/competition/components/competition-table';
import { Competition } from '@/features/competition/components/competition-table/competition-list-column';
import { CompetitionSearchButtons } from '@/features/competition/components/competition-bar/competition-search-buttons';
import { AddCompetitionModalTrigger } from '@/features/competition/components/add-competition-modal-trigger';
const competitionData: Competition[] = [
  { name: 'John', title: '첫 번째 공지사항', date: '2025.10.01', number: 1, category: 'general' },
  { name: 'Jane', title: '두 번째 공지사항', date: '2025.10.02', number: 2, category: 'study' },
  { name: 'Alice', title: '세 번째 공지사항', date: '2025.10.03', number: 3, category: 'rating' },
  { name: 'Bob', title: '네 번째 공지사항', date: '2025.10.04', number: 4, category: 'etc' },
  {
    name: 'Charlie',
    title: '다섯 번째 공지사항',
    date: '2025.10.05',
    number: 5,
    category: 'external',
  },
  {
    name: 'David',
    title: '여섯 번째 공지사항',
    date: '2025.10.06',
    number: 6,
    category: 'general',
  },
  { name: 'Eve', title: '일곱 번째 공지사항', date: '2025.10.07', number: 7, category: 'study' },
  { name: 'Frank', title: '여덟 번째 공지사항', date: '2025.10.08', number: 8, category: 'rating' },
  { name: 'Grace', title: '아홉 번째 공지사항', date: '2025.10.09', number: 9, category: 'etc' },
  { name: 'Henry', title: '열 번째 공지사항', date: '2025.10.10', number: 10, category: 'general' },
  {
    name: 'Ivy',
    title: '열한 번째 공지사항',
    date: '2025.10.11',
    number: 11,
    category: 'external',
  },
  { name: 'Jack', title: '열두 번째 공지사항', date: '2025.10.12', number: 12, category: 'study' },
  { name: 'Kate', title: '열세 번째 공지사항', date: '2025.10.13', number: 13, category: 'rating' },
  { name: 'Luke', title: '열네 번째 공지사항', date: '2025.10.14', number: 14, category: 'etc' },
  {
    name: 'Mary',
    title: '열다섯 번째 공지사항',
    date: '2025.10.15',
    number: 15,
    category: 'general',
  },
];

export default function CompetitonListPage(): React.ReactElement {
  const router = useRouter();
  return (
    <PageLayout>
      <div className="flex w-full flex-col gap-6 py-3">
        <div className="flex justify-between">
          <Title size="sm" weight="bold">
            대회
          </Title>
          <AddCompetitionModalTrigger />
        </div>
        <CompetitionSearchButtons />
        <CompetitionTable className="mt-6" data={competitionData} />
      </div>
    </PageLayout>
  );
}
