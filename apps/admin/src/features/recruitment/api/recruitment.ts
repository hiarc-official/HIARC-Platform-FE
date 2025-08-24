import { apiClient } from '@/shared/api/client';
import {
  PageableModel,
  Recruitment,
  StudentApply,
  UpdateRecruitmentRequest,
} from '@hiarc-platform/shared';

export const recruitmentApi = {
  GET_RECRUIT_MEMBERS: async ({
    semesterId,
    page,
    size,
  }: {
    semesterId: number;
    page: number;
    size: number;
  }): Promise<PageableModel<StudentApply>> => {
    const response = await apiClient.get<PageableModel<StudentApply>>(
      `/admin/recruitment/${semesterId}/members`,
      {
        params: { page, size },
      }
    );
    return PageableModel.fromJson(response.data, StudentApply);
  },

  START_RECRUITMENT: async (semesterId: number): Promise<void> => {
    await apiClient.post<void>(`/admin/recruitment/${semesterId}`);
  },

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
};
