import { apiClient } from '@/shared/api/client';
import { Recruitment, UpdateRecruitmentRequest } from '@hiarc-platform/shared';

export const recruitmentApi = {
  // 학회원 모집 정보 조회
  GET_RECRUITMENT: async (semesterId: number): Promise<Recruitment> => {
    try {
      const response = await apiClient(`/admin/recruitment/${semesterId}`);
      return Recruitment.fromJson(response.data);
    } catch (error) {
      console.error('[RECRUITMENT API] GET_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  UPDATE_RECRUITMENT: async (semesterId: number, data: UpdateRecruitmentRequest): Promise<void> => {
    try {
      await apiClient.patch(`/admin/recruitment/${semesterId}`, data);
    } catch (error) {
      console.error('[RECRUITMENT API] UPDATE_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  START_RECRUITMENT: async (semesterId: number): Promise<void> => {
    try {
      await apiClient.post(`/admin/recruitment/${semesterId}`);
    } catch (error) {
      console.error('[RECRUITMENT API] START_RECRUITMENT 에러:', error);
      throw error;
    }
  },
};
