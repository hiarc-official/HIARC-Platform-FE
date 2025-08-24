import { apiClient } from '../../../shared/api/client';
import { MemberProfile } from '../types/model/member-profile';

export const myApi = {
  UPDATE_MY_INTRODUCTION: async (introduction: string): Promise<void> =>
    await apiClient.patch('/members/me/introduction', {
      introduction,
    }),

  GET_MY_PROFILE: async (): Promise<MemberProfile> => {
    const response = await apiClient.get('/members/me');
    return MemberProfile.fromJson(response.data);
  },

  GET_MEMBER_PROFILE: async (memberId: number): Promise<MemberProfile> => {
    const response = await apiClient.get(`/members/${memberId}`);
    return MemberProfile.fromJson(response.data);
  },

  GET_MEMBER_ID_BY_HANDLE: async (bojHandle: string): Promise<number> => {
    const response = await apiClient.get('/members/me/handle', {
      params: {
        bojHandle,
      },
    });
    return response.data.memberId;
  },
};
