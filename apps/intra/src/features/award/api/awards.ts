import { apiClient } from '../../../shared/api/client';

import { Award, PageableModel } from '@hiarc-platform/shared';
import { AwardQueryParams } from '../types/request/award-query-params';
import { CreateAwardRequest } from '../types/request/create-award-request';
import { UpdateAwardRequest } from '../types/request/update-award-request';

export const awardsApi = {
  // 수상 내역 검색
  SEARCH_AWARDS: async (params: AwardQueryParams = {}): Promise<PageableModel<Award>> => {
    const response = await apiClient.get('/awards', { params });
    return PageableModel.create<Award>(response.data, Award);
  },

  // 내 수상 내역 조회/관리
  GET_MY_AWARDS: async (): Promise<Award[]> => {
    const response = await apiClient.get('/awards/me');
    return response.data.map((item: unknown) => Award.fromJson(item));
  },

  // 수상 내역 추가
  CREATE_AWARD: async (awardData: CreateAwardRequest): Promise<void> => {
    await apiClient.post('/awards/me', awardData);
  },

  // 수상 내역 수정
  UPDATE_AWARD: async (awardId: number, awardData: UpdateAwardRequest): Promise<void> => {
    await apiClient.patch(`/awards/${awardId}`, awardData);
  },

  // 수상 내역 삭제
  DELETE_AWARD: async (awardId: number): Promise<void> => {
    await apiClient.delete(`/awards/${awardId}`);
  },
};

export type { AwardQueryParams } from '../types/request/award-query-params';
export type { CreateAwardRequest } from '../types/request/create-award-request';
export type { UpdateAwardRequest } from '../types/request/update-award-request';
