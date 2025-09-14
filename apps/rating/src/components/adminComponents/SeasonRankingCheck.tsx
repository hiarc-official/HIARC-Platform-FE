import styled from 'styled-components';
import { checkAdminApi, getSeasonRanking } from '../../api/AdminApi';
import { useState } from 'react';
import { Modal } from '../Modal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  margin-bottom: 29px;
`;

const Button = styled.button`
  background-color: #ffa5a5;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  padding: 12px;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #0af;
  }
`;

const SeasonSelectorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SeasonSelectorWrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  z-index: 1000;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;

const SeasonLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
`;

const SeasonSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 16px;
`;

const ActionButton = styled.button`
  background-color: #ffa5a5;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  padding: 12px 20px;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    background-color: #0af;
  }
`;

type Season = {
  seasonId: number;
  description: string;
  seasonStartAt: string;
  seasonEndAt: string;
};

interface SeasonRankingCheckProps {
  division: number;
}

export const SeasonRankingCheck = ({ division }: SeasonRankingCheckProps) => {
  const [isSeasonSelectorOpen, setIsSeasonSelectorOpen] = useState(false);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [rankingData, setRankingData] = useState<any>(null);
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
      <Wrapper>
        시즌별 div{division} 랭킹 조회하기
        <Button onClick={buttonClick} disabled={loading}>
          {loading ? '불러오는중...' : '확인하기'}
        </Button>
      </Wrapper>

      {isSeasonSelectorOpen && (
        <SeasonSelectorModal onClick={() => setIsSeasonSelectorOpen(false)}>
          <SeasonSelectorWrapper onClick={(e) => e.stopPropagation()}>
            <SeasonLabel>시즌을 선택하세요:</SeasonLabel>
            <SeasonSelect
              value={selectedSeasonId || ''}
              onChange={(e) => setSelectedSeasonId(Number(e.target.value))}
            >
              <option value="">시즌을 선택하세요</option>
              {seasons.map((season) => (
                <option key={season.seasonId} value={season.seasonId}>
                  시즌 {season.seasonId} - {season.description} ({new Date(season.seasonStartAt).toLocaleDateString('ko-KR')} ~ {new Date(season.seasonEndAt).toLocaleDateString('ko-KR')})
                </option>
              ))}
            </SeasonSelect>
            <div>
              <ActionButton onClick={handleSeasonSelect} disabled={loading}>
                {loading ? '조회중...' : '조회하기'}
              </ActionButton>
              <ActionButton onClick={() => setIsSeasonSelectorOpen(false)}>
                취소
              </ActionButton>
            </div>
          </SeasonSelectorWrapper>
        </SeasonSelectorModal>
      )}

      {isRankingModalOpen && (
        <Modal
          content={rankingData}
          onClose={() => setIsRankingModalOpen(false)}
        />
      )}
    </>
  );
};