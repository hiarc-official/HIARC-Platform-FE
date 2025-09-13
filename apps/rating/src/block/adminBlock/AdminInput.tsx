import styled from 'styled-components';
import { AdminExplain } from '../../util/AdminExplain';
import { Ex } from '../../util/AdminExplain';
import Color from '../../util/Color';
import { useState, useEffect } from 'react';
import { sendAdminInput, checkAdminApi } from '../../api/AdminApi';

const Wrapper = styled.div`
  overflow: visible;
  border-bottom: 1px solid black;
`;
const Header = styled.div`
  margin-top: 36px;
  margin-bottom: 36px;
  font-size: 17.5px;
  font-weight: 700;
`;
const Explain = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 24px;
`;
const EX = styled.div`
  font-size: 12px;
  white-space: pre-wrap;
`;

const InputBox = styled.div`
  background-color: ${Color.yellowBackground};
  width: 500px;
  height: 166px;
  margin-top: 24px;
  margin-bottom: 49px;
`;
const Input = styled.textarea`
  height: 110px;
  width: 98%;
  background-color: inherit;
  border: none;
  text-align: start;
  padding-top: 10px;
  vertical-align: top;
  box-sizing: border-box;
  resize: none;
`;
const Button = styled.button`
  background-color: #ffa5a5;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  padding: 12px;
  cursor: pointer;
  &:hover {
    background-color: #0af;
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const SeasonSelector = styled.div`
  margin-bottom: 16px;
`;

const SeasonLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  display: block;
`;

const SeasonSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
  margin-bottom: 8px;
`;
type Season = {
  seasonId: number;
  description: string;
  seasonStartAt: string;
  seasonEndAt: string;
};

type Event = {
  eventId: number;
  description: string;
  eventStartAt: string;
  eventEndAt: string;
};

const AdminInput = ({ BlockName }: { BlockName: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // 시즌/이벤트 수정하기인 경우 목록 불러오기
  useEffect(() => {
    if (BlockName === '현재 시즌 수정하기') {
      loadSeasons();
    } else if (BlockName === '이벤트 수정하기') {
      loadEvents();
    }
  }, [BlockName]);

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
    if (BlockName === '현재 시즌 수정하기' && !selectedSeasonId) {
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
    <Wrapper>
      <Header>{BlockName}</Header>
      <Explain>{AdminExplain[BlockName] || '잠시오류'}</Explain>
      <EX>{Ex[BlockName]}</EX>

      {/* 시즌 수정하기인 경우 시즌 선택기 표시 */}
      {BlockName === '현재 시즌 수정하기' && (
        <SeasonSelector>
          <SeasonLabel>수정할 시즌 선택:</SeasonLabel>
          <SeasonSelect value={selectedSeasonId || ''} onChange={handleSeasonChange}>
            <option value="">시즌을 선택하세요</option>
            {seasons.map((season) => (
              <option key={season.seasonId} value={season.seasonId}>
                시즌 {season.seasonId} - {season.description} ({new Date(season.seasonStartAt).toLocaleDateString('ko-KR')} ~ {new Date(season.seasonEndAt).toLocaleDateString('ko-KR')})
              </option>
            ))}
          </SeasonSelect>
        </SeasonSelector>
      )}

      {/* 이벤트 수정하기인 경우 이벤트 선택기 표시 */}
      {BlockName === '이벤트 수정하기' && (
        <SeasonSelector>
          <SeasonLabel>수정할 이벤트 선택:</SeasonLabel>
          <SeasonSelect value={selectedEventId || ''} onChange={handleEventChange}>
            <option value="">이벤트를 선택하세요</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                이벤트 {event.eventId} - {event.description} ({new Date(event.eventStartAt).toLocaleDateString('ko-KR')} ~ {new Date(event.eventEndAt).toLocaleDateString('ko-KR')})
              </option>
            ))}
          </SeasonSelect>
        </SeasonSelector>
      )}

      <InputBox>
        <Input value={inputValue} onChange={handleInputChange} />
        <BottomWrapper>
          <Button onClick={handleSubmit}>{loading ? '전송중...' : '입력하기'}</Button>
        </BottomWrapper>
      </InputBox>
    </Wrapper>
  );
};

export default AdminInput;
