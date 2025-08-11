import { apiClient } from '../../../shared/api/client';
import type {
  UpdateIntroductionRequest,
  PastStudyListResponse,
  CurrentStudyParticipantResponse,
} from '../types/member';
import { MyPageData } from '../types/model/my-page-data';
import { Award } from '@/features/awards/types/model/award';
import { Rating } from '../types/model/rating';
import { Streak } from '../types/model/streak';
import { RatingRecord } from '../types/model/rating-record';
import { StreakData } from '../types/model/streak-data';

// API에서 받는 award 데이터 타입
interface ApiAwardData {
  date: string;
  organization: string;
  awardName: string;
  awardDetail: string;
}

// API에서 받는 rating 데이터 타입
interface ApiRatingData {
  seasonScore: number;
  totalScore: number;
  todayScore: number;
  records: Array<{
    description: string;
    division: 'DIV_1' | 'DIV_2' | 'DIV_3';
    ranking: number;
  }>;
}

// API에서 받는 streak 데이터 타입  
interface ApiStreakData {
  today: string;
  streakData: Array<{
    date: string;
    value: boolean;
  }>;
}

export const myApi = {
  UPDATE_MY_INTRODUCTION: async (data: UpdateIntroductionRequest): Promise<void> =>
    apiClient.patch('/members/me/introduction', data),

  GET_MY_PAST_STUDIES: async (): Promise<Record<string, PastStudyListResponse>> => {
    const response = await apiClient.get<Record<string, PastStudyListResponse>>(
      '/members/me/studies/past'
    );
    return response.data;
  },

  GET_MY_CURRENT_STUDIES: async (): Promise<CurrentStudyParticipantResponse[]> => {
    const response = await apiClient.get<CurrentStudyParticipantResponse[]>(
      '/members/me/studies/current'
    );
    return response.data;
  },

  GET_MY_PAGE_DATA: async (): Promise<MyPageData> => {
    const response = await apiClient.get('/members/me');
    console.log('[myApi] Raw API response:', response.data);

    try {
      const rawData = response.data;
      console.log('[myApi] Processing data:', rawData);

      // Award 배열을 변환
      const transformedAwards =
        rawData.award?.map((awardData: ApiAwardData) => {
          console.log('[myApi] Creating Award from:', awardData);
          return new Award({
            organization: awardData.organization,
            awardName: awardData.awardName,
            awardDetail: awardData.awardDetail,
            awardDate: awardData.date,
          });
        }) || [];

      console.log('[myApi] Created Award instances:', transformedAwards);

      // Rating 변환
      const transformedRating = rawData.rating ? (() => {
        console.log('[myApi] Creating Rating from:', rawData.rating);
        const ratingRecords = (rawData.rating as ApiRatingData).records.map(record => 
          new RatingRecord({
            description: record.description,
            division: record.division,
            ranking: record.ranking,
          })
        );
        return new Rating({
          seasonScore: (rawData.rating as ApiRatingData).seasonScore,
          totalScore: (rawData.rating as ApiRatingData).totalScore,
          todayScore: (rawData.rating as ApiRatingData).todayScore,
          records: ratingRecords,
        });
      })() : null;

      console.log('[myApi] Created Rating instance:', transformedRating);

      // Streak 변환
      const transformedStreak = rawData.streak ? (() => {
        console.log('[myApi] Creating Streak from:', rawData.streak);
        const streakDataArray = (rawData.streak as ApiStreakData).streakData.map(streakData => 
          new StreakData({
            date: streakData.date,
            value: streakData.value,
          })
        );
        return new Streak({
          today: (rawData.streak as ApiStreakData).today,
          streakData: streakDataArray,
        });
      })() : null;

      console.log('[myApi] Created Streak instance:', transformedStreak);

      // 변환된 데이터로 새 객체 생성
      const transformedData = {
        ...rawData,
        award: transformedAwards,
        rating: transformedRating,
        streak: transformedStreak,
      };

      console.log('[myApi] Calling MyPageData.fromJson with transformed data...');
      const myPageData = MyPageData.fromJson(transformedData);
      console.log('[myApi] Created MyPageData instance:', myPageData);
      console.log('[myApi] Awards from getter:', myPageData.awards);
      return myPageData;
    } catch (error) {
      console.error('[myApi] Failed to create MyPageData:', error);
      console.error('[myApi] Raw data that failed:', response.data);
      throw error;
    }
  },
};
