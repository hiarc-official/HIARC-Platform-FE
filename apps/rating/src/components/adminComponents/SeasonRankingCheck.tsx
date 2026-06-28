'use client';

import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DialogUtil,
} from '@hiarc-platform/design-system';
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
      DialogUtil.showError('시즌 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonSelect = async () => {
    if (!selectedSeasonId) {
      DialogUtil.showError('시즌을 선택해주세요.');
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
      DialogUtil.showError('랭킹 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-3 items-center">
        <Label size="sm" weight="medium">
          시즌별 div{division} 랭킹 조회하기
        </Label>
        <Button size="sm" onClick={buttonClick} disabled={loading}>
          {loading ? '불러오는중...' : '확인하기'}
        </Button>
      </div>

      {isSeasonSelectorOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/40 z-[999] flex justify-center items-center"
          onClick={() => setIsSeasonSelectorOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg border border-gray-200 z-[1000] w-[400px] max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Label size="md" weight="bold" className="mb-4 block">
              시즌을 선택하세요:
            </Label>
            <Select
              value={selectedSeasonId ? String(selectedSeasonId) : ''}
              onValueChange={(value) => setSelectedSeasonId(Number(value))}
            >
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="시즌을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season.seasonId} value={String(season.seasonId)}>
                    시즌 {season.seasonId} - {season.description} ({new Date(season.seasonStartAt).toLocaleDateString('ko-KR')} ~ {new Date(season.seasonEndAt).toLocaleDateString('ko-KR')})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSeasonSelect} disabled={loading}>
                {loading ? '조회중...' : '조회하기'}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsSeasonSelectorOpen(false)}>
                취소
              </Button>
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
