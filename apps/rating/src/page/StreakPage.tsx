'use client';

import { useState } from 'react';
import {
  PageLayout,
  Title,
  Label,
  Pagination,
  SkeletonTransition,
  useMinimumLoading,
} from '@hiarc-platform/design-system';
import { PageableModel } from '@hiarc-platform/shared';
import NewStreakEntity from '../block/streak/NewStreakEntity';
import { useStreakData } from '@/hooks/use-streak-data';
import { Member } from '../api/StreakApi';
import { StreakEntitySkeleton } from '../components/skeletons';

const StreakPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { data: streakData, isLoading, isError } = useStreakData(currentPage, pageSize);
  const loading = useMinimumLoading(isLoading);

  const pageable = streakData ? new PageableModel<Member>(streakData) : null;

  return (
    <PageLayout containerClassName="flex-col items-stretch justify-start">
      <div className="flex w-full flex-col gap-8">
        <div>
          <Title size="sm" weight="bold">
            Streak
          </Title>
          <Label size="sm" className="mt-1 block text-gray-600">
            멤버별 코딩 스트릭 현황
          </Label>
        </div>

        {isError ? (
          <Label size="md" className="text-gray-600">
            데이터를 불러오는데 실패했습니다.
          </Label>
        ) : (
          <SkeletonTransition loading={loading} skeleton={<StreakEntitySkeleton count={4} />}>
            <div className="flex w-full flex-col gap-8">
              <div className="grid w-full grid-cols-1 gap-4 min-[1180px]:grid-cols-2">
                {streakData?.content.map((member) => (
                  <NewStreakEntity key={member.memberId} member={member} />
                ))}
              </div>

              {streakData && streakData.totalPages > 1 && (
                <div className="flex flex-col items-center gap-2">
                  <Pagination
                    pageableModel={pageable}
                    onPageChange={(page) => setCurrentPage(page - 1)}
                  />
                  <Label size="xs" className="text-gray-500">
                    총 {streakData.totalElements}명
                  </Label>
                </div>
              )}
            </div>
          </SkeletonTransition>
        )}
      </div>
    </PageLayout>
  );
};

export default StreakPage;
