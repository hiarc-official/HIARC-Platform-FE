import apiClient from './ApiClient';

export interface StreakDataItem {
  date: string;
  value: boolean;
}

export interface Streak {
  today: string;
  streakData: StreakDataItem[];
  streakStartAt: string;
  currentTotalStreak: number;
  currentSeasonStreak: number;
}

export interface Member {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  division: string;
  streak: Streak;
}

export interface PageableResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Member[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string[];
}

export const fetchStreakData = async (params: PaginationParams): Promise<PageableResponse> => {
  try {
    const requestParams: any = {
      page: params.page,
      size: params.size,
    };

    if (params.sort && params.sort.length > 0) {
      requestParams.sort = params.sort;
    }

    console.log('🔵 요청:', requestParams);

    const response = await apiClient.get<PageableResponse>('/rating/streak/ranking', {
      params: requestParams,
    });

    console.log('🟢 응답:', {
      page: response.data.number,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
    });

    return response.data;
  } catch (error) {
    console.error('Streak 데이터 가져오기 실패:', error);
    return {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      sort: { empty: true, sorted: false, unsorted: true },
      first: true,
      last: true,
      numberOfElements: 0,
      pageable: {
        offset: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: true,
      },
      empty: true,
    };
  }
};
