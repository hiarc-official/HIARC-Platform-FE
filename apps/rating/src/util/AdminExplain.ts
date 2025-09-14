export const AdminExplain: Record<string, string> = {
  '새로운 시즌 시작하기':
    '시즌 기간을 형식에 맞게 입력하세요. semesterId 는 학기 조회하기 에서 확인해주세요!',
  '새로운 이벤트 시작하기':
    '이벤트 기간을 형식에 맞게 입력하세요.\n scoreMultipier 은 2~5배까지만 가능합니다 seasonId는 시즌 history에서 확인해주세요',
  '현재 시즌 수정하기': '현재 시즌 정보를 수정합니다',
  '이벤트 수정하기': '이벤트 정보를 수정합니다',
  '핸들별 유저 정보 확인하기': `핸들로 학생 검색하면 DB에 저장되어 있는 문제수를 확인할 수 있습니다`,
  'HITING값 직접 수정하기': `hiting 점수를 직접 수정할 수 있습니다. 푼 문제수는 수정되지 않습니다.\n그래도 자주 사용X`,
};

export const AdminWarn: Record<string, string> = {
  '새로운 시즌 시작하기': '주의: 현재 시점보다 미래의 시간만 가능',
  '현재 시즌 중도 마무리': '주의: 현재 시점보다 미래의 시간만 가능, 시작 시간 변경은 불가능',
  '새로운 이벤트 시작하기':
    '주의: 현재 시점보다 미래의 시간만 가능, 2배 이벤트와 티어 이벤트 동시에 안됨',
  '현재 이벤트 중도 마무리': '주의: 현재 시점보다 미래의 시간만 가능, 시작 시간 변경은 불가능',
};

export const Ex: Record<string, string> = {
  '새로운 시즌 시작하기': `ex.\n\n{\n"semesterId":1,\n"description":"시즌 이름",\n"seasonStartAt":"2025-03-02T02:39:36",\n "seasonEndAt":"2025-03-04T02:39:36"\n}`,
  '새로운 이벤트 시작하기': `ex.\n\n{\n"seasonId":1,\n"description":"이벤트 이름",\n"scoreMultiplier":2,\n"eventStartAt":"2025-03-02T02:39:36",\n "eventEndAt":"2025-03-04T02:39:36"\n}`,
  '현재 시즌 수정하기':
    'ex.\n\n{\n"description":"시즌 이름",\n"seasonStartAt":"2025-03-02T02:39:36",\n "seasonEndAt":"2025-03-04T02:39:36"\n}',
  '이벤트 수정하기':
    'ex.\n\n{\n"description":"이벤트 이름",\n"scoreMultiplier":5,\n"eventStartAt":"2025-09-13T19:28:46",\n"eventEndAt":"2025-09-13T19:28:46"\n}',
  '핸들별 유저 정보 확인하기': `ex.ghwo336`,
  'HITING값 직접 수정하기': `\n1. 핸들 입력\nex.ghwo336\n 2.현재 하이팅 점수에서 더하고 싶은 값을 입력\nex.\n{\n"totalHiting":0,\n"seasonHiting":2,\n"dailyHiting":2,\n,"eventHiting:0\n}`,
};
