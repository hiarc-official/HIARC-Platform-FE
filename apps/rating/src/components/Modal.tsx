'use client';

import TierImg from '../util/TierImg';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from '@hiarc-platform/design-system';

interface ApprovedNotification {
  semesterId: number;
  semesterYear: number;
  semesterType: string;
  greetingDescription: string;
}

interface MemberData {
  memberId: number;
  bojHandle: string;
  memberRole: string;
  adminRole: string;
  approvedNotification: ApprovedNotification;
}

interface SeasonData {
  seasonId: number;
  description: string;
  seasonStartAt: string;
  seasonEndAt: string;
}

interface EventData {
  eventId: number;
  description: string;
  eventStartAt: string;
  eventEndAt: string;
}

interface SemesterData {
  semesterId: number;
  semesterYear: number;
  semesterType: string;
}

interface UserStatsData {
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
  solvedCounts: Array<{
    tier: number;
    solvedCount: number;
  }>;
}

interface RankingMember {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
}

type RankingData = RankingMember[];

export type ModalContent =
  | string
  | MemberData
  | SeasonData[]
  | EventData[]
  | SemesterData[]
  | UserStatsData
  | RankingData;

interface ModalProps {
  content: ModalContent;
  onClose(): void;
}

const sectionClass = 'mb-6';
const sectionTitleClass = 'm-0 mb-4 text-[18px] font-bold text-[#333] border-b-2 border-[#f0f0f0] pb-2';
const infoRowClass = 'flex mb-3 items-center';
const infoLabelClass = 'font-semibold text-[#666] min-w-[120px] mr-4';
const infoValueClass = 'text-[#333] font-medium';

const renderMemberData = (data: MemberData): React.ReactElement => (
  <>
    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>회원 정보</h3>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>회원 ID:</span>
        <span className={infoValueClass}>{data.memberId}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>BOJ 핸들:</span>
        <span className={infoValueClass}>{data.bojHandle}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>회원 역할:</span>
        <span className={infoValueClass}>{data.memberRole}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>관리자 역할:</span>
        <span className={infoValueClass}>{data.adminRole}</span>
      </div>
    </div>

    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>승인 알림 정보</h3>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>학기 ID:</span>
        <span className={infoValueClass}>{data.approvedNotification.semesterId}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>학기:</span>
        <span className={infoValueClass}>
          {data.approvedNotification.semesterYear}년{' '}
          {data.approvedNotification.semesterType === 'FIRST' ? '1학기' : '2학기'}
        </span>
      </div>
      <div className="bg-[#f8f9fa] p-4 rounded-lg border-l-4 border-[#007bff]">
        <h3 className="m-0 mb-3 text-[16px] font-bold text-[#333]">환영 메시지</h3>
        <p className="m-0 leading-relaxed whitespace-pre-line text-[#333]">
          {data.approvedNotification.greetingDescription}
        </p>
      </div>
    </div>
  </>
);

const renderSeasonData = (data: SeasonData[]): React.ReactElement => {
  // 시즌 ID가 높은 순서부터 정렬
  const sortedData = [...data].sort((a, b) => b.seasonId - a.seasonId);

  return (
    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>시즌 정보 (총 {data.length}개)</h3>
      {sortedData.map((season) => (
        <div key={season.seasonId} className="mb-5 p-4 bg-[#f8f9fa] rounded-lg">
          <div className={infoRowClass}>
            <span className={infoLabelClass}>시즌 ID:</span>
            <span className={infoValueClass}>{season.seasonId}</span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>설명:</span>
            <span className={infoValueClass}>{season.description}</span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>시작 시간:</span>
            <span className={infoValueClass}>
              {new Date(season.seasonStartAt).toLocaleString('ko-KR')}
            </span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>종료 시간:</span>
            <span className={infoValueClass}>
              {new Date(season.seasonEndAt).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const renderEventData = (data: EventData[]): React.ReactElement => {
  // 이벤트 ID가 높은 순서부터 정렬
  const sortedData = [...data].sort((a, b) => b.eventId - a.eventId);

  return (
    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>이벤트 정보 (총 {data.length}개)</h3>
      {sortedData.map((event) => (
        <div key={event.eventId} className="mb-5 p-4 bg-[#f8f9fa] rounded-lg">
          <div className={infoRowClass}>
            <span className={infoLabelClass}>이벤트 ID:</span>
            <span className={infoValueClass}>{event.eventId}</span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>설명:</span>
            <span className={infoValueClass}>{event.description}</span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>시작 시간:</span>
            <span className={infoValueClass}>
              {new Date(event.eventStartAt).toLocaleString('ko-KR')}
            </span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>종료 시간:</span>
            <span className={infoValueClass}>
              {new Date(event.eventEndAt).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const renderSemesterData = (data: SemesterData[]): React.ReactElement => {
  // 학기 ID가 높은 순서부터 정렬
  const sortedData = [...data].sort((a, b) => b.semesterId - a.semesterId);

  return (
    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>학기 정보 (총 {data.length}개)</h3>
      {sortedData.map((semester) => (
        <div key={semester.semesterId} className="mb-5 p-4 bg-[#f8f9fa] rounded-lg">
          <div className={infoRowClass}>
            <span className={infoLabelClass}>학기 ID:</span>
            <span className={infoValueClass}>{semester.semesterId}</span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>학년도:</span>
            <span className={infoValueClass}>{semester.semesterYear}년</span>
          </div>
          <div className={infoRowClass}>
            <span className={infoLabelClass}>학기:</span>
            <span className={infoValueClass}>
              {semester.semesterType === 'FIRST'
                ? '1학기'
                : semester.semesterType === 'SECOND'
                  ? '2학기'
                  : semester.semesterType}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const renderUserStatsData = (data: UserStatsData): React.ReactElement => (
  <>
    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>유저 통계 정보</h3>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>티어:</span>
        <span className={infoValueClass}>{data.tier}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>총 점수:</span>
        <span className={infoValueClass}>{data.totalScore}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>일일 점수:</span>
        <span className={infoValueClass}>{data.dailyScore}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>현재 시즌 점수:</span>
        <span className={infoValueClass}>{data.currentSeasonScore}</span>
      </div>
      <div className={infoRowClass}>
        <span className={infoLabelClass}>현재 이벤트 점수:</span>
        <span className={infoValueClass}>{data.currentEventScore}</span>
      </div>
    </div>

    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>티어별 해결 문제 수</h3>
      {data.solvedCounts.map((solvedCount, index) => (
        <div className={infoRowClass} key={index}>
          <span className={infoLabelClass}>티어 {solvedCount.tier}:</span>
          <span className={infoValueClass}>{solvedCount.solvedCount}문제</span>
        </div>
      ))}
    </div>
  </>
);

const rankingThClass =
  'bg-[#f8f9fa] px-2 py-3 border border-[#dee2e6] text-[14px] font-semibold text-center';
const rankingTdClass = 'px-2 py-2.5 border border-[#dee2e6] text-[13px] text-center';

const renderRankingData = (data: RankingData): React.ReactElement => {
  const getRankingPosition = (index: number): number => index + 1;

  return (
    <div className={sectionClass}>
      <h3 className={sectionTitleClass}>랭킹 (총 {data.length}명)</h3>

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className={rankingThClass}>순위</th>
            <th className={rankingThClass}>이름</th>
            <th className={rankingThClass}>BOJ 핸들</th>
            <th className={rankingThClass}>티어</th>
            <th className={rankingThClass}>총 점수</th>
            <th className={rankingThClass}>일일 점수</th>
            <th className={rankingThClass}>시즌 점수</th>
            <th className={rankingThClass}>이벤트 점수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((member: RankingMember, index: number) => (
            <tr key={member.memberId}>
              <td className={rankingTdClass}>{getRankingPosition(index)}</td>
              <td className={rankingTdClass}>{member.name}</td>
              <td className={rankingTdClass}>{member.bojHandle}</td>
              <td className={rankingTdClass}>
                <div className="flex justify-center items-center">
                  <TierImg tier={member.tier} />
                </div>
              </td>
              <td className={rankingTdClass}>{member.totalScore}</td>
              <td className={rankingTdClass}>{member.dailyScore}</td>
              <td className={`${rankingTdClass} font-semibold text-[#007bff]`}>
                {member.currentSeasonScore}
              </td>
              <td className={rankingTdClass}>{member.currentEventScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const errorContentClass =
  'text-[#dc3545] font-mono bg-[#f8d7da] p-4 rounded-lg border border-[#f5c6cb]';

const renderStringContent = (content: string): React.ReactElement => {
  if (!content || typeof content !== 'string') {
    return (
      <div className={errorContentClass}>
        <div>데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const lines = content.split(',');
  return (
    <div className={errorContentClass}>
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
};

export const Modal = ({ content, onClose }: ModalProps): React.ReactElement => {
  const isMemberData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is MemberData => typeof data === 'object' && data !== null && 'memberId' in data && !('content' in data);

  const isSeasonData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is SeasonData[] => Array.isArray(data) && data.length > 0 && 'seasonId' in data[0];

  const isEventData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is EventData[] => Array.isArray(data) && data.length > 0 && 'eventId' in data[0];

  const isSemesterData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is SemesterData[] => Array.isArray(data) && data.length > 0 && 'semesterId' in data[0];

  const isUserStatsData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is UserStatsData => (
      typeof data === 'object' &&
      data !== null &&
      'tier' in data &&
      'totalScore' in data &&
      'solvedCounts' in data &&
      !('content' in data)
    );

  const isRankingData = (
    data:
      | string
      | MemberData
      | SeasonData[]
      | EventData[]
      | SemesterData[]
      | UserStatsData
      | RankingData
  ): data is RankingData => (
      Array.isArray(data) &&
      data.length > 0 &&
      'memberId' in data[0] &&
      'bojHandle' in data[0] &&
      'currentSeasonScore' in data[0]
    );

  const renderContent = (): React.ReactElement => {
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

  // 부모가 {isOpen && <Modal/>}로 마운트를 제어하므로 항상 open. 닫힘은 onClose로 위임.
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[800px]">
        <DialogTitle className="sr-only">상세 정보</DialogTitle>
        {renderContent()}
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            뒤로가기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
