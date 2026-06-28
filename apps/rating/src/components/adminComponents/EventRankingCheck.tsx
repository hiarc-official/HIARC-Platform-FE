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
import { checkAdminApi, getEventRanking } from '../../api/AdminApi';
import { useState } from 'react';
import { Modal, ModalContent } from '../Modal';

interface Event {
  eventId: number;
  description: string;
  eventStartAt: string;
  eventEndAt: string;
}

export const EventRankingCheck = () => {
  const [isEventSelectorOpen, setIsEventSelectorOpen] = useState(false);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [rankingData, setRankingData] = useState<ModalContent | null>(null);
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
      DialogUtil.showError('이벤트 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEventSelect = async () => {
    if (!selectedEventId) {
      DialogUtil.showError('이벤트를 선택해주세요.');
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
      DialogUtil.showError('랭킹 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-3 items-center">
        <Label size="sm" weight="medium">
          지난 이벤트 랭킹 조회하기
        </Label>
        <Button size="sm" onClick={buttonClick} disabled={loading}>
          {loading ? '불러오는중...' : '확인하기'}
        </Button>
      </div>

      {isEventSelectorOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/40 z-[999] flex justify-center items-center"
          onClick={() => setIsEventSelectorOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg border border-gray-200 z-[1000] w-[400px] max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Label size="md" weight="bold" className="mb-4 block">
              이벤트를 선택하세요:
            </Label>
            <Select
              value={selectedEventId ? String(selectedEventId) : ''}
              onValueChange={(value) => setSelectedEventId(Number(value))}
            >
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="이벤트를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.eventId} value={String(event.eventId)}>
                    이벤트 {event.eventId} - {event.description} ({new Date(event.eventStartAt).toLocaleDateString('ko-KR')} ~ {new Date(event.eventEndAt).toLocaleDateString('ko-KR')})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleEventSelect} disabled={loading}>
                {loading ? '조회중...' : '조회하기'}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsEventSelectorOpen(false)}>
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
