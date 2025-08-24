'use client';
import { Title, Button } from '@hiarc-platform/ui';
import { CompetitionTable } from '../../components/award-table';
import { CompetitionSearchButtons } from '../../components/competition-bar/competition-search-buttons';
import { useAwardListPageState } from '../../hooks/page/use-award-list-page-state';

export function DesktopAwardListPage(): React.ReactElement {
  const { data, handleAddAward } = useAwardListPageState();

  return (
    <div className="flex w-full flex-col gap-6 py-4">
      <div className="flex justify-between">
        <Title size="sm" weight="bold">
          대회
        </Title>
        <Button size="md" onClick={handleAddAward}>
          추가하기
        </Button>
      </div>
      <CompetitionSearchButtons />
      <CompetitionTable className="mt-6" data={data} />
    </div>
  );
}