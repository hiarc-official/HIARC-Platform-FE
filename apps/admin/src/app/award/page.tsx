'use client';
import { Title, PageLayout, Button, DialogUtil } from '@hiarc-platform/ui';
import { CompetitionTable } from '@/features/award/components/award-table';
import { CompetitionSearchButtons } from '@/features/award/components/competition-bar/competition-search-buttons';
import { useAwardList } from '@/features/award/hooks/use-award-list';
import { AddAwardDialog } from '@/features/award/components/add-award-modal';

export default function CompetitonListPage(): React.ReactElement {
  const { data } = useAwardList();

  return (
    <PageLayout>
      <div className="flex w-full flex-col gap-6 py-4">
        <div className="flex justify-between">
          <Title size="sm" weight="bold">
            대회
          </Title>
          <Button
            size="md"
            onClick={() => {
              DialogUtil.showComponent(<AddAwardDialog />);
            }}
          >
            추가하기
          </Button>
        </div>
        <CompetitionSearchButtons />
        <CompetitionTable className="mt-6" data={data} />
      </div>
    </PageLayout>
  );
}
