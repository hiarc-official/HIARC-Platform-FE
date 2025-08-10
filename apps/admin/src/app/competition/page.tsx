'use client';
import { Title } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@hiarc-platform/ui';
import { CompetitionTable } from '@/features/competition/components/competition-table';
import { Competition } from '@/features/competition/components/competition-table/competition-list-column';
import { CompetitionSearchButtons } from '@/features/competition/components/competition-bar/competition-search-buttons';
import { AddCompetitionModalTrigger } from '@/features/competition/components/add-competition-modal-trigger';
import { competitionData } from 'constants/mock';

export default function CompetitonListPage(): React.ReactElement {
  const router = useRouter();
  return (
    <PageLayout>
      <div className="flex w-full flex-col gap-6 py-4">
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
