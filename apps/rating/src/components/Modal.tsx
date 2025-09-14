import styled from 'styled-components';
import TierImg from '../util/TierImg';

type ApprovedNotification = {
  semesterId: number;
  semesterYear: number;
  semesterType: string;
  greetingDescription: string;
};

type MemberData = {
  memberId: number;
  bojHandle: string;
  memberRole: string;
  adminRole: string;
  approvedNotification: ApprovedNotification;
};

type SeasonData = {
  seasonId: number;
  description: string;
  seasonStartAt: string;
  seasonEndAt: string;
};

type EventData = {
  eventId: number;
  description: string;
  eventStartAt: string;
  eventEndAt: string;
};

type SemesterData = {
  semesterId: number;
  semesterYear: number;
  semesterType: string;
};

type UserStatsData = {
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
  solvedCounts: Array<{
    tier: number;
    solvedCount: number;
  }>;
};

type RankingMember = {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
};

type RankingData = RankingMember[];

type ModalProps = {
  content:
    | string
    | MemberData
    | SeasonData[]
    | EventData[]
    | SemesterData[]
    | UserStatsData
    | RankingData;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  left: 0;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  z-index: 1000;
  width: 800px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  font-family: 'Pretendard', sans-serif;
`;

const ContentSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #666;
  min-width: 120px;
  margin-right: 16px;
`;

const InfoValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const NotificationContent = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #007bff;
`;

const NotificationText = styled.p`
  margin: 0;
  line-height: 1.6;
  white-space: pre-line;
  color: #333;
`;

const ErrorContent = styled.div`
  color: #dc3545;
  font-family: monospace;
  background-color: #f8d7da;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #ddd;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  width: 80px;
  height: 40px;
`;

const renderMemberData = (data: MemberData) => (
  <>
    <ContentSection>
      <SectionTitle>회원 정보</SectionTitle>
      <InfoRow>
        <InfoLabel>회원 ID:</InfoLabel>
        <InfoValue>{data.memberId}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>BOJ 핸들:</InfoLabel>
        <InfoValue>{data.bojHandle}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>회원 역할:</InfoLabel>
        <InfoValue>{data.memberRole}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>관리자 역할:</InfoLabel>
        <InfoValue>{data.adminRole}</InfoValue>
      </InfoRow>
    </ContentSection>

    <ContentSection>
      <SectionTitle>승인 알림 정보</SectionTitle>
      <InfoRow>
        <InfoLabel>학기 ID:</InfoLabel>
        <InfoValue>{data.approvedNotification.semesterId}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>학기:</InfoLabel>
        <InfoValue>
          {data.approvedNotification.semesterYear}년{' '}
          {data.approvedNotification.semesterType === 'FIRST' ? '1학기' : '2학기'}
        </InfoValue>
      </InfoRow>
      <NotificationContent>
        <SectionTitle
          style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            borderBottom: 'none',
            paddingBottom: '0',
          }}
        >
          환영 메시지
        </SectionTitle>
        <NotificationText>{data.approvedNotification.greetingDescription}</NotificationText>
      </NotificationContent>
    </ContentSection>
  </>
);

const renderSeasonData = (data: SeasonData[]) => {
  // 시즌 ID가 높은 순서부터 정렬
  const sortedData = [...data].sort((a, b) => b.seasonId - a.seasonId);

  return (
    <>
      <ContentSection>
        <SectionTitle>시즌 정보 (총 {data.length}개)</SectionTitle>
        {sortedData.map((season) => (
          <div
            key={season.seasonId}
            style={{
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <InfoRow>
              <InfoLabel>시즌 ID:</InfoLabel>
              <InfoValue>{season.seasonId}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>설명:</InfoLabel>
              <InfoValue>{season.description}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>시작 시간:</InfoLabel>
              <InfoValue>{new Date(season.seasonStartAt).toLocaleString('ko-KR')}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>종료 시간:</InfoLabel>
              <InfoValue>{new Date(season.seasonEndAt).toLocaleString('ko-KR')}</InfoValue>
            </InfoRow>
          </div>
        ))}
      </ContentSection>
    </>
  );
};

const renderEventData = (data: EventData[]) => {
  // 이벤트 ID가 높은 순서부터 정렬
  const sortedData = [...data].sort((a, b) => b.eventId - a.eventId);

  return (
    <>
      <ContentSection>
        <SectionTitle>이벤트 정보 (총 {data.length}개)</SectionTitle>
        {sortedData.map((event) => (
          <div
            key={event.eventId}
            style={{
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <InfoRow>
              <InfoLabel>이벤트 ID:</InfoLabel>
              <InfoValue>{event.eventId}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>설명:</InfoLabel>
              <InfoValue>{event.description}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>시작 시간:</InfoLabel>
              <InfoValue>{new Date(event.eventStartAt).toLocaleString('ko-KR')}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>종료 시간:</InfoLabel>
              <InfoValue>{new Date(event.eventEndAt).toLocaleString('ko-KR')}</InfoValue>
            </InfoRow>
          </div>
        ))}
      </ContentSection>
    </>
  );
};

const renderSemesterData = (data: SemesterData[]) => {
  // 학기 ID가 높은 순서부터 정렬
  const sortedData = [...data].sort((a, b) => b.semesterId - a.semesterId);

  return (
    <>
      <ContentSection>
        <SectionTitle>학기 정보 (총 {data.length}개)</SectionTitle>
        {sortedData.map((semester) => (
          <div
            key={semester.semesterId}
            style={{
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <InfoRow>
              <InfoLabel>학기 ID:</InfoLabel>
              <InfoValue>{semester.semesterId}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>학년도:</InfoLabel>
              <InfoValue>{semester.semesterYear}년</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>학기:</InfoLabel>
              <InfoValue>
                {semester.semesterType === 'FIRST'
                  ? '1학기'
                  : semester.semesterType === 'SECOND'
                    ? '2학기'
                    : semester.semesterType}
              </InfoValue>
            </InfoRow>
          </div>
        ))}
      </ContentSection>
    </>
  );
};

const renderUserStatsData = (data: UserStatsData) => (
  <>
    <ContentSection>
      <SectionTitle>유저 통계 정보</SectionTitle>
      <InfoRow>
        <InfoLabel>티어:</InfoLabel>
        <InfoValue>{data.tier}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>총 점수:</InfoLabel>
        <InfoValue>{data.totalScore}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>일일 점수:</InfoLabel>
        <InfoValue>{data.dailyScore}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>현재 시즌 점수:</InfoLabel>
        <InfoValue>{data.currentSeasonScore}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>현재 이벤트 점수:</InfoLabel>
        <InfoValue>{data.currentEventScore}</InfoValue>
      </InfoRow>
    </ContentSection>

    <ContentSection>
      <SectionTitle>티어별 해결 문제 수</SectionTitle>
      {data.solvedCounts.map((solvedCount, index) => (
        <InfoRow key={index}>
          <InfoLabel>티어 {solvedCount.tier}:</InfoLabel>
          <InfoValue>{solvedCount.solvedCount}문제</InfoValue>
        </InfoRow>
      ))}
    </ContentSection>
  </>
);

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const RankingTh = styled.th`
  background-color: #f8f9fa;
  padding: 12px 8px;
  border: 1px solid #dee2e6;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const RankingTd = styled.td`
  padding: 10px 8px;
  border: 1px solid #dee2e6;
  font-size: 13px;
  text-align: center;
`;

const renderRankingData = (data: RankingData) => {
  const getRankingPosition = (index: number) => {
    return index + 1;
  };

  return (
    <>
      <ContentSection>
        <SectionTitle>
          랭킹 (총 {data.length}명)
        </SectionTitle>

        <RankingTable>
          <thead>
            <tr>
              <RankingTh>순위</RankingTh>
              <RankingTh>이름</RankingTh>
              <RankingTh>BOJ 핸들</RankingTh>
              <RankingTh>티어</RankingTh>
              <RankingTh>총 점수</RankingTh>
              <RankingTh>일일 점수</RankingTh>
              <RankingTh>시즌 점수</RankingTh>
              <RankingTh>이벤트 점수</RankingTh>
            </tr>
          </thead>
          <tbody>
            {data.map((member: RankingMember, index: number) => (
              <tr key={member.memberId}>
                <RankingTd>{getRankingPosition(index)}</RankingTd>
                <RankingTd>{member.name}</RankingTd>
                <RankingTd>{member.bojHandle}</RankingTd>
                <RankingTd>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TierImg tier={member.tier} />
                  </div>
                </RankingTd>
                <RankingTd>{member.totalScore}</RankingTd>
                <RankingTd>{member.dailyScore}</RankingTd>
                <RankingTd style={{ fontWeight: 600, color: '#007bff' }}>
                  {member.currentSeasonScore}
                </RankingTd>
                <RankingTd>{member.currentEventScore}</RankingTd>
              </tr>
            ))}
          </tbody>
        </RankingTable>
      </ContentSection>
    </>
  );
};

const renderStringContent = (content: string) => {
  if (!content || typeof content !== 'string') {
    return (
      <ErrorContent>
        <div>데이터를 불러올 수 없습니다.</div>
      </ErrorContent>
    );
  }

  const lines = content.split(',');
  return (
    <ErrorContent>
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </ErrorContent>
  );
};

export const Modal = ({ content, onClose }: ModalProps) => {
  const isMemberData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is MemberData => {
    return typeof data === 'object' && data !== null && 'memberId' in data && !('content' in data);
  };

  const isSeasonData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is SeasonData[] => {
    return Array.isArray(data) && data.length > 0 && 'seasonId' in data[0];
  };

  const isEventData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is EventData[] => {
    return Array.isArray(data) && data.length > 0 && 'eventId' in data[0];
  };

  const isSemesterData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is SemesterData[] => {
    return Array.isArray(data) && data.length > 0 && 'semesterId' in data[0];
  };

  const isUserStatsData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is UserStatsData => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'tier' in data &&
      'totalScore' in data &&
      'solvedCounts' in data &&
      !('content' in data)
    );
  };

  const isRankingData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is RankingData => {
    return (
      Array.isArray(data) &&
      data.length > 0 &&
      'memberId' in data[0] &&
      'bojHandle' in data[0] &&
      'currentSeasonScore' in data[0]
    );
  };

  const renderContent = () => {
    if (!content) {
      return renderStringContent('데이터가 없습니다.');
    }
    if (isRankingData(content)) {
      return renderRankingData(content);
    }
    if (isSeasonData(content)) {
      return renderSeasonData(content);
    }
    if (isEventData(content)) {
      return renderEventData(content);
    }
    if (isSemesterData(content)) {
      return renderSemesterData(content);
    }
    if (isUserStatsData(content)) {
      return renderUserStatsData(content);
    }
    if (isMemberData(content)) {
      return renderMemberData(content);
    }
    return renderStringContent(content as string);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {renderContent()}
        <CloseButton onClick={onClose}>뒤로가기</CloseButton>
      </ModalWrapper>
    </Overlay>
  );
};
