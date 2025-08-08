import { apiClient } from '../../../shared/api/client';
import { MemberProfile } from '../types/model/member-profile';
import { StudySummary } from '../../study/types/study-summary';

export const memberApi = {
  // 현재 사용자의 스터디 목록 조회 (현재/과거)
  GET_MY_STUDIES: async (): Promise<StudySummary[]> => {
    const response = await apiClient.get('/members/me/studies');
    return response.data.map((item: any) => StudySummary.fromJson(item));
  },

  // 특정 멤버의 프로필 조회
  GET_MEMBER_PROFILE: async (memberId: string): Promise<MemberProfile> => {
    const response = await apiClient.get(`/members/${memberId}/profile`);
    return new MemberProfile(response.data);
  },
};

export type { Member } from '../types/model/member';
export type { MemberProfile } from '../types/model/member-profile';
