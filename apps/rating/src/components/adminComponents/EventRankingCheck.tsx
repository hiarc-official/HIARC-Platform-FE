import styled from 'styled-components';
import { checkAdminApi, getEventRanking } from '../../api/AdminApi';
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

const EventSelectorModal = styled.div`
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

const EventSelectorWrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  z-index: 1000;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;

const EventLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display: block;
`;

const EventSelect = styled.select`
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

type Event = {
  eventId: number;
  description: string;
  eventStartAt: string;
  eventEndAt: string;
};

export const EventRankingCheck = () => {
  const [isEventSelectorOpen, setIsEventSelectorOpen] = useState(false);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [rankingData, setRankingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const buttonClick = async () => {
    try {
      setLoading(true);
      const response = await checkAdminApi('event');
      const data = response.data.data || response.data;
      if (Array.isArray(data)) {
        const sortedEvents = data.sort((a: Event, b: Event) => b.eventId - a.eventId);
        setEvents(sortedEvents);
        setIsEventSelectorOpen(true);
      }
    } catch (error) {
      console.error('이벤트 목록 불러오기 실패:', error);
      alert('이벤트 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEventSelect = async () => {
    if (!selectedEventId) {
      alert('이벤트를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      const response = await getEventRanking(selectedEventId);
      setRankingData(response.data);
      setIsEventSelectorOpen(false);
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
        지난 이벤트 랭킹 조회하기
        <Button onClick={buttonClick} disabled={loading}>
          {loading ? '불러오는중...' : '확인하기'}
        </Button>
      </Wrapper>

      {isEventSelectorOpen && (
        <EventSelectorModal onClick={() => setIsEventSelectorOpen(false)}>
          <EventSelectorWrapper onClick={(e) => e.stopPropagation()}>
            <EventLabel>이벤트를 선택하세요:</EventLabel>
            <EventSelect
              value={selectedEventId || ''}
              onChange={(e) => setSelectedEventId(Number(e.target.value))}
            >
              <option value="">이벤트를 선택하세요</option>
              {events.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  이벤트 {event.eventId} - {event.description} ({new Date(event.eventStartAt).toLocaleDateString('ko-KR')} ~ {new Date(event.eventEndAt).toLocaleDateString('ko-KR')})
                </option>
              ))}
            </EventSelect>
            <div>
              <ActionButton onClick={handleEventSelect} disabled={loading}>
                {loading ? '조회중...' : '조회하기'}
              </ActionButton>
              <ActionButton onClick={() => setIsEventSelectorOpen(false)}>
                취소
              </ActionButton>
            </div>
          </EventSelectorWrapper>
        </EventSelectorModal>
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