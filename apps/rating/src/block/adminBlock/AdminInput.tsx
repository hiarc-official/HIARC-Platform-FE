'use client';

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

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeasonId(Number(e.target.value));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(Number(e.target.value));
  };

  const handleSubmit = async () => {
    // 시즌 수정하기인 경우 시즌 선택 확인
    if (BlockName === '시즌 정보 수정하기' && !selectedSeasonId) {
      alert('수정할 시즌을 선택해주세요.');
      return;
    }

    // 이벤트 수정하기인 경우 이벤트 선택 확인
    if (BlockName === '이벤트 수정하기' && !selectedEventId) {
      alert('수정할 이벤트를 선택해주세요.');
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
      alert('전송 실패');
      console.log('실패', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-visible border-b border-black">
      <div className="mt-9 mb-9 text-[17.5px] font-bold">{BlockName}</div>
      <div className="text-[12px] font-bold mb-6">{AdminExplain[BlockName] || '잠시오류'}</div>
      <div className="text-[12px] whitespace-pre-wrap">{Ex[BlockName]}</div>

      {/* 시즌 수정하기인 경우 시즌 선택기 표시 */}
      {BlockName === '시즌 정보 수정하기' && (
        <div className="mb-4">
          <label className="text-[12px] font-bold mb-2 block">수정할 시즌 선택:</label>
          <select
            className="p-2 border border-[#ccc] rounded-[4px] text-[14px] w-[200px] mb-2"
            value={selectedSeasonId || ''}
            onChange={handleSeasonChange}
          >
            <option value="">시즌을 선택하세요</option>
            {seasons.map((season) => (
              <option key={season.seasonId} value={season.seasonId}>
                시즌 {season.seasonId} - {season.description} ({new Date(season.seasonStartAt).toLocaleDateString('ko-KR')} ~ {new Date(season.seasonEndAt).toLocaleDateString('ko-KR')})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 이벤트 수정하기인 경우 이벤트 선택기 표시 */}
      {BlockName === '이벤트 수정하기' && (
        <div className="mb-4">
          <label className="text-[12px] font-bold mb-2 block">수정할 이벤트 선택:</label>
          <select
            className="p-2 border border-[#ccc] rounded-[4px] text-[14px] w-[200px] mb-2"
            value={selectedEventId || ''}
            onChange={handleEventChange}
          >
            <option value="">이벤트를 선택하세요</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                이벤트 {event.eventId} - {event.description} ({new Date(event.eventStartAt).toLocaleDateString('ko-KR')} ~ {new Date(event.eventEndAt).toLocaleDateString('ko-KR')})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="bg-[#FFFCED] w-[500px] h-[166px] mt-6 mb-[49px]">
        <textarea
          className="h-[110px] w-[98%] bg-inherit border-none text-start pt-[10px] align-top box-border resize-none"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="w-full flex justify-end items-end">
          <button
            className="bg-[#ffa5a5] border-none rounded-[10px] text-[12px] font-bold p-3 cursor-pointer hover:bg-primary"
            onClick={handleSubmit}
          >
            {loading ? '전송중...' : '입력하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInput;
