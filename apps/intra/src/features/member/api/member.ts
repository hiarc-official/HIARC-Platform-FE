import { apiClient } from '../../../shared/api/client';
import type {
  MemberProfileResponse,
  StreakInfoResponse,
  StreakHeatmapResponse,
  HitingScoreResponse,
  ExcellentSeasonResponse,
  AwardResponse,
} from '../types/member';

export const memberApi = {
  GET_MEMBER_PROFILE: async (memberId: number): Promise<MemberProfileResponse> => {
    console.log('[MEMBER API] GET_MEMBER_PROFILE 요청:', memberId);
    try {
      const response = await apiClient.get<MemberProfileResponse>(`/members/${memberId}`);
      console.log('[MEMBER API] GET_MEMBER_PROFILE 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[MEMBER API] GET_MEMBER_PROFILE 에러:', error);
      throw error;
    }
  },

  GET_MEMBER_STREAK_INFO: async (memberId: number): Promise<StreakInfoResponse> => {
    console.log('[MEMBER API] GET_MEMBER_STREAK_INFO 요청:', memberId);
    try {
      const response = await apiClient.get<StreakInfoResponse>(`/members/${memberId}/streak-info`);
      console.log('[MEMBER API] GET_MEMBER_STREAK_INFO 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[MEMBER API] GET_MEMBER_STREAK_INFO 에러:', error);
      throw error;
    }
  },

  GET_MEMBER_STREAK_HEATMAP: async (memberId: number): Promise<StreakHeatmapResponse> => {
    console.log('[MEMBER API] GET_MEMBER_STREAK_HEATMAP 요청:', memberId);
    try {
      const response = await apiClient.get<StreakHeatmapResponse>(
        `/members/${memberId}/streak-heatmap`
      );
      console.log('[MEMBER API] GET_MEMBER_STREAK_HEATMAP 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[MEMBER API] GET_MEMBER_STREAK_HEATMAP 에러:', error);
      throw error;
    }
  },

  GET_MEMBER_HITING_SCORE: async (memberId: number): Promise<HitingScoreResponse> => {
    console.log('[MEMBER API] GET_MEMBER_HITING_SCORE 요청:', memberId);
    try {
      const response = await apiClient.get<HitingScoreResponse>(
        `/members/${memberId}/hiting-score`
      );
      console.log('[MEMBER API] GET_MEMBER_HITING_SCORE 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[MEMBER API] GET_MEMBER_HITING_SCORE 에러:', error);
      throw error;
    }
  },

  GET_MEMBER_EXCELLENT_SEASONS: async (memberId: number): Promise<ExcellentSeasonResponse[]> => {
    console.log('[MEMBER API] GET_MEMBER_EXCELLENT_SEASONS 요청:', memberId);
    try {
      const response = await apiClient.get<ExcellentSeasonResponse[]>(
        `/members/${memberId}/excellent-seasons`
      );
      console.log('[MEMBER API] GET_MEMBER_EXCELLENT_SEASONS 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[MEMBER API] GET_MEMBER_EXCELLENT_SEASONS 에러:', error);
      throw error;
    }
  },

  GET_MEMBER_AWARDS: async (memberId: string): Promise<AwardResponse[]> => {
    console.log('[MEMBER API] GET_MEMBER_AWARDS 요청:', memberId);
    try {
      const response = await apiClient.get<AwardResponse[]>(`/members/${memberId}/awards`);
      console.log('[MEMBER API] GET_MEMBER_AWARDS 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[MEMBER API] GET_MEMBER_AWARDS 에러:', error);
      throw error;
    }
  },
};
