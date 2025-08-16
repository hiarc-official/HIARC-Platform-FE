import { Award, PageableModel } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { AwardQueryParams } from '../types/request/award-query-params';
import { CreateAwardRequest } from '../types/request/create-award-request';
import { UpdateAwardRequest } from '../types/request/update-award-request';

export const awardApi = {
  // 관리자 공지사항 목록 조회 (페이지네이션)
  GET_ADMIN_AWARDS: async (params: AwardQueryParams = {}): Promise<PageableModel<Award>> => {
    const response = await apiClient.get<PageableModel<Award>>('/admin/awards', {
      params,
    });
    return PageableModel.fromJson(response.data, Award);
  },

  CREATE_ADMIN_AWARD: async (data: CreateAwardRequest): Promise<void> => {
    await apiClient.post('/admin/awards', data);
  },

  UPDATE_ADMIN_AWARD: async (awardId: number, data: UpdateAwardRequest): Promise<void> => {
    await apiClient.patch(`/admin/awards/${awardId}`, data);
  },

  DELETE_ADMIN_AWARD: async (awardId: number): Promise<void> => {
    await apiClient.delete(`/admin/awards/${awardId}`);
  },
};
