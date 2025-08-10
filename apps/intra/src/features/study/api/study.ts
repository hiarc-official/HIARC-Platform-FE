import { apiClient } from '../../../shared/api/client';

import { Study } from '../types/model/study';
import { CreateStudyRequest } from '../types/request/create-study-request';
import { UpdateStudyRequest } from '../types/request/update-study-request';
import { StudyQueryParams } from '../types/request/study-query-params';
import { PageableModel } from '@/shared/types/pageable-model';
import { StudySummary } from '../types/study-summary';

export const studyApi = {
  // 스터디 목록 조회 (페이지네이션)
  GET_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    const response = await apiClient.get('/studies', { params });
    return PageableModel.create<StudySummary>(response.data, StudySummary);
  },

  // 스터디 상세 조회
  GET_STUDY: async (id: string): Promise<Study> => {
    const response = await apiClient.get(`/studies/${id}`);
    return Study.fromJson(response.data);
  },

  // 스터디 생성
  CREATE_STUDY: async (studyData: CreateStudyRequest): Promise<Study> => {
    const response = await apiClient.post('/studies', studyData);
    return Study.fromJson(response.data);
  },

  // 스터디 수정
  UPDATE_STUDY: async (id: string, studyData: UpdateStudyRequest): Promise<Study> => {
    const response = await apiClient.put(`/studies/${id}`, studyData);
    return Study.fromJson(response.data);
  },

  // 스터디 삭제
  DELETE_STUDY: async (id: string): Promise<void> => {
    await apiClient.delete(`/studies/${id}`);
  },

  // 스터디 신청하기
  APPLY_TO_STUDY: async (studyId: string): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/application`);
  },
};

export type { CreateStudyRequest } from '../types/request/create-study-request';
export type { UpdateStudyRequest } from '../types/request/update-study-request';
export type { StudyQueryParams } from '../types/request/study-query-params';