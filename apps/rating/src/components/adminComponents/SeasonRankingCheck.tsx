'use client';

import { checkAdminApi, getSeasonRanking } from '../../api/AdminApi';
import { useState } from 'react';
import { Modal, ModalContent } from '../Modal';

interface Season {
  seasonId: number;
  description: string;
  seasonStartAt: string;
  seasonEndAt: string;
}

interface SeasonRankingCheckProps {
  division: number;
}

export const SeasonRankingCheck = ({ division }: SeasonRankingCheckProps) => {
  const [isSeasonSelectorOpen, setIsSeasonSelectorOpen] = useState(false);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [rankingData, setRankingData] = useState<ModalContent | null>(null);
  const [loading, setLoading] = useState(false);

  const buttonClick = async () => {
    try {
      setLoading(true);
      const response = await checkAdminApi('season');
      const data = response.data.data || response.data;
      if (Array.isArray(data)) {
        const sortedSeasons = data.sort((a: Season, b: Season) => b.seasonId - a.seasonId);
        setSeasons(sortedSeasons);
        setIsSeasonSelectorOpen(true);
      }
    } catch (error) {
      console.error('시즌 목록 불러오기 실패:', error);
      alert('시즌 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonSelect = async () => {
    if (!selectedSeasonId) {
      alert('시즌을 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      const response = await getSeasonRanking(selectedSeasonId, division);
      setRankingData(response.data);
      setIsSeasonSelectorOpen(false);
      setIsRankingModalOpen(true);
    } catch (error) {
      console.error('랭킹 데이터 조회 실패:', error);
      alert('랭킹 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-[15px] items-center mb-[29px]">
        시즌별 div{division} 랭킹 조회하기
        <button
          className="bg-[#ffa5a5] border-none rounded-[10px] text-[12px] font-bold p-3 cursor-pointer relative hover:bg-primary"
          onClick={buttonClick}
          disabled={loading}
        >
          {loading ? '불러오는중...' : '확인하기'}
        </button>
      </div>

      {isSeasonSelectorOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/40 z-[999] flex justify-center items-center"
          onClick={() => setIsSeasonSelectorOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-[10px] z-[1000] w-[400px] max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <label className="text-[16px] font-bold mb-4 block">시즌을 선택하세요:</label>
            <select
              className="p-2 border border-[#ccc] rounded-[4px] text-[14px] w-full mb-4"
              value={selectedSeasonId || ''}
              onChange={(e) => setSelectedSeasonId(Number(e.target.value))}
            >
              <option value="">시즌을 선택하세요</option>
              {seasons.map((season) => (
                <option key={season.seasonId} value={season.seasonId}>
                  시즌 {season.seasonId} - {season.description} ({new Date(season.seasonStartAt).toLocaleDateString('ko-KR')} ~ {new Date(season.seasonEndAt).toLocaleDateString('ko-KR')})
                </option>
              ))}
            </select>
            <div>
              <button
                className="bg-[#ffa5a5] border-none rounded-[10px] text-[12px] font-bold py-3 px-5 cursor-pointer mr-2 hover:bg-primary"
                onClick={handleSeasonSelect}
                disabled={loading}
              >
                {loading ? '조회중...' : '조회하기'}
              </button>
              <button
                className="bg-[#ffa5a5] border-none rounded-[10px] text-[12px] font-bold py-3 px-5 cursor-pointer mr-2 hover:bg-primary"
                onClick={() => setIsSeasonSelectorOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {isRankingModalOpen && (
        <Modal
          content={rankingData ?? ''}
          onClose={() => setIsRankingModalOpen(false)}
        />
      )}
    </>
  );
};
