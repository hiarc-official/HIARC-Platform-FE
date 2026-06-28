'use client';

import {
  Button,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DialogUtil,
} from '@hiarc-platform/design-system';
import { AdminExplain } from '../../util/AdminExplain';
import { Ex } from '../../util/AdminExplain';
import { useState, useEffect } from 'react';
import { sendAdminInput, checkAdminApi } from '../../api/AdminApi';

interface Season {
  seasonId: number;
  description: string;
  seasonStartAt: string;
  seasonEndAt: string;
}

interface Event {
  eventId: number;
  description: string;
  eventStartAt: string;
  eventEndAt: string;
}

const AdminInput = ({ BlockName }: { BlockName: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const loadSeasons = async () => {
    try {
      const response = await checkAdminApi('season');
      const data = response.data.data || response.data;
      if (Array.isArray(data)) {
        const sortedSeasons = data.sort((a: Season, b: Season) => b.seasonId - a.seasonId);
        setSeasons(sortedSeasons);
      }
    } catch (error) {
      console.error('시즌 목록 불러오기 실패:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await checkAdminApi('event');
      const data = response.data.data || response.data;
      if (Array.isArray(data)) {
        const sortedEvents = data.sort((a: Event, b: Event) => b.eventId - a.eventId);
        setEvents(sortedEvents);
      }
    } catch (error) {
      console.error('이벤트 목록 불러오기 실패:', error);
    }
  };

  // 시즌/이벤트 수정하기인 경우 목록 불러오기
  useEffect(() => {
    if (BlockName === '시즌 정보 수정하기') {
      loadSeasons();
    } else if (BlockName === '이벤트 수정하기') {
      loadEvents();
    }
  }, [BlockName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSeasonChange = (value: string) => {
    setSelectedSeasonId(Number(value));
  };

  const handleEventChange = (value: string) => {
    setSelectedEventId(Number(value));
  };

  const handleSubmit = async () => {
    // 시즌 수정하기인 경우 시즌 선택 확인
    if (BlockName === '시즌 정보 수정하기' && !selectedSeasonId) {
      DialogUtil.showError('수정할 시즌을 선택해주세요.');
      return;
    }

    // 이벤트 수정하기인 경우 이벤트 선택 확인
    if (BlockName === '이벤트 수정하기' && !selectedEventId) {
      DialogUtil.showError('수정할 이벤트를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      const params = selectedSeasonId || selectedEventId || undefined;
      const response = await sendAdminInput(BlockName, inputValue, params);
      if (response) {
        setInputValue('');
        setSelectedSeasonId(null);
        setSelectedEventId(null);

        // 성공 후 페이지 리렌더링을 위해 약간의 지연 후 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      DialogUtil.showError('전송 실패');
      console.log('실패', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 overflow-visible">
      <Label size="lg" weight="bold">
        {BlockName}
      </Label>
      <div className="flex flex-col gap-2">
        <Label size="xs" weight="bold" className="block">
          {AdminExplain[BlockName] || '잠시오류'}
        </Label>
        <Label size="xs" weight="regular" className="block whitespace-pre-wrap text-gray-600">
          {Ex[BlockName]}
        </Label>
      </div>

      {/* 시즌 수정하기인 경우 시즌 선택기 표시 */}
      {BlockName === '시즌 정보 수정하기' && (
        <div className="flex flex-col gap-2">
          <Label size="xs" weight="bold" className="block">
            수정할 시즌 선택:
          </Label>
          <Select value={selectedSeasonId ? String(selectedSeasonId) : ''} onValueChange={handleSeasonChange}>
            <SelectTrigger className="w-full max-w-[400px]">
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
        </div>
      )}

      {/* 이벤트 수정하기인 경우 이벤트 선택기 표시 */}
      {BlockName === '이벤트 수정하기' && (
        <div className="flex flex-col gap-2">
          <Label size="xs" weight="bold" className="block">
            수정할 이벤트 선택:
          </Label>
          <Select value={selectedEventId ? String(selectedEventId) : ''} onValueChange={handleEventChange}>
            <SelectTrigger className="w-full max-w-[400px]">
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
        </div>
      )}

      <div className="w-full max-w-[500px]">
        <Textarea
          className="h-[110px] resize-none"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="w-full flex justify-end items-end mt-2">
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            {loading ? '전송중...' : '입력하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminInput;
