import { apiClient } from '../../../shared/api/client';
import type {
  UpdateIntroductionRequest,
  PastStudyListResponse,
  CurrentStudyParticipantResponse,
} from '../types/member';
import { MyPageData } from '../types/model/my-page-data';

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

    return MyPageData.fromJson(response.data);
  },
};
