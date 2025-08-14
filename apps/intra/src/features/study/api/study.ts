import { apiClient } from '../../../shared/api/client';

import { Study } from '../types/model/study-model/study';
import { CreateStudyRequest } from '../types/request/create-study-request';
import { UpdateStudyRequest } from '../types/request/update-study-request';
import { StudyQueryParams } from '../types/request/study-query-params';
import { PageableModel } from '@hiarc-platform/shared';
import { StudySummary } from '../types/model/study-model/study-summary';

export const studyApi = {
  // 스터디 목록 조회 (페이지네이션)
  GET_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    const response = await apiClient.get('/studies', { params });

    try {
      // API 응답이 빈 배열인 경우 기본 PageableModel 구조 생성
      if (Array.isArray(response.data) && response.data.length === 0) {
        const defaultPageableData = {
          content: [],
          pageable: {
            sort: { sorted: false, unsorted: true, empty: true },
            offset: 0,
            pageSize: 10,
            pageNumber: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalPages: 0,
          totalElements: 0,
          size: 10,
          number: 0,
          sort: { sorted: false, unsorted: true, empty: true },
          first: true,
          numberOfElements: 0,
          empty: true,
        };

        return PageableModel.create<StudySummary>(defaultPageableData, StudySummary);
      }

      // API 응답 데이터를 새로운 StudySummary 구조에 맞게 변환
      const content = response.data.content?.map((item: any) => StudySummary.fromJson(item)) ?? [];

      const transformedData = {
        ...response.data,
        content,
      };

      // 이미 변환된 객체들을 직접 사용
      const pageableProps = {
        content,
        pageable: response.data.pageable,
        last: response.data.last,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        size: response.data.size,
        number: response.data.number,
        sort: response.data.sort,
        first: response.data.first,
        numberOfElements: response.data.numberOfElements,
        empty: response.data.empty,
      };

      return new PageableModel(pageableProps);
    } catch (error) {
      throw error;
    }
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
