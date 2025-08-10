import { apiClient } from '../../../shared/api/client';
import { Award } from '../types/model/award';
import { PageableModel } from '@/shared/types/pageable-model';
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
    return response.data.map((item: any) => new Award(item));
  },

  // 수상 내역 추가
  CREATE_AWARD: async (awardData: CreateAwardRequest): Promise<Award> => {
    const response = await apiClient.post('/awards/me', awardData);
    return new Award(response.data);
  },

  // 수상 내역 수정
  UPDATE_AWARD: async (awardId: string, awardData: UpdateAwardRequest): Promise<Award> => {
    const response = await apiClient.put(`/awards/me/${awardId}`, awardData);
    return new Award(response.data);
  },

  // 수상 내역 삭제
  DELETE_AWARD: async (awardId: string): Promise<void> => {
    await apiClient.delete(`/awards/me/${awardId}`);
  },
};

export type { AwardQueryParams } from '../types/request/award-query-params';
export type { CreateAwardRequest } from '../types/request/create-award-request';
export type { UpdateAwardRequest } from '../types/request/update-award-request';