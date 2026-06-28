'use client';

import { useState } from 'react';
import NewStreakEntity from '../block/streak/NewStreakEntity';
import { useStreakData } from '@/hooks/use-streak-data';

const StreakPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { data: streakData, isLoading: loading, isError } = useStreakData(currentPage, pageSize);

  const handlePrevPage = () => {
    if (streakData && !streakData.first) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (streakData && !streakData.last) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-[480px]:ml-4 max-[480px]:mb-10">
      <div className="text-[35px] font-black pb-6">Streak</div>
      {loading ? (
        <p>로딩 중...</p>
      ) : isError ? (
        <p>데이터를 불러오는데 실패했습니다.</p>
      ) : (
        <>
          {/* ponytail: 등장 fade 애니메이션 생략(레이아웃 동일) */}
          <div className="flex flex-wrap gap-[60px_80px] justify-start w-full max-[480px]:justify-center max-[480px]:gap-10 max-[480px]:ml-[-16px]">
            {streakData?.content.map((member) => (
              <NewStreakEntity key={member.memberId} member={member} />
            ))}
          </div>

          {streakData && streakData.totalPages > 1 && (
            <div className="flex justify-center gap-[10px] mt-[60px]">
              <button
                onClick={handlePrevPage}
                disabled={streakData.first || loading}
                className="px-3 py-2 text-[14px] font-bold bg-primary text-white rounded-[5px] cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                이전
              </button>
              <div className="mt-[5px]">
                {streakData.number + 1} / {streakData.totalPages}
                <span className="block text-[12px] text-[#666]">
                  (총 {streakData.totalElements}명)
                </span>
              </div>
              <button
                onClick={handleNextPage}
                disabled={streakData.last || loading}
                className="px-3 py-2 text-[14px] font-bold bg-primary text-white rounded-[5px] cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StreakPage;
