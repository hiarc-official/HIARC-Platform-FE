import { apiClient } from './ApiClient';

interface ApprovedNotification {
  semesterId: number;
  semesterYear: number;
  semesterType: 'FIRST' | 'SECOND';
  greetingDescription: string;
}

interface AuthMeResponse {
  memberId: number;
  bojHandle: string;
  memberRole: 'GUEST' | 'MEMBER' | 'ADMIN';
  approvedNotification: ApprovedNotification;
}

export const authApi = {
  /**
   * 현재 로그인한 사용자의 정보를 조회하는 API입니다.
   * @returns 사용자 정보 객체를 반환합니다.
   */
  GET_ME: async (): Promise<AuthMeResponse> => {
    console.log('[AUTH API] GET_ME 요청');
    try {
      const response = await apiClient.get<AuthMeResponse>('/auth/me');
      console.log('[AUTH API] GET_ME 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[AUTH API] GET_ME 에러:', error);
      throw error;
    }
  },

  /**
   * 현재 사용자가 관리자 권한을 가지고 있는지 확인하는 API입니다.
   * @returns 관리자 권한 여부를 반환합니다.
   */
  CHECK_ADMIN: async (): Promise<boolean> => {
    console.log('[AUTH API] CHECK_ADMIN 요청');
    try {
      const response = await apiClient.get<AuthMeResponse>('/auth/me');
      console.log('[AUTH API] CHECK_ADMIN 응답:', response.data);
      return response.data.memberRole === 'ADMIN';
    } catch (error) {
      console.error('[AUTH API] CHECK_ADMIN 에러:', error);
      return false;
    }
  },
};
