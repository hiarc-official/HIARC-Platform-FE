'use client';
import { Title, Button } from '@hiarc-platform/ui';
import { CompetitionTable } from '../../components/award-table';
import { CompetitionSearchButtons } from '../../components/competition-bar/competition-search-buttons';
import { useAwardListPageState } from '../../hooks/page/use-award-list-page-state';

export function MobileAwardListPage(): React.ReactElement {
  const { data, handleAddAward } = useAwardListPageState();

  return (
    <div className="flex w-full flex-col gap-4 px-4 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Title size="sm" weight="bold">
            대회
          </Title>
          <Button size="sm" onClick={handleAddAward}>
            추가하기
          </Button>
        </div>
        <CompetitionSearchButtons />
      </div>
      <CompetitionTable className="mt-2" data={data} />
    </div>
  );
}