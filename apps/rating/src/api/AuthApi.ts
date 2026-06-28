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
    const response = await apiClient.get<AuthMeResponse>('/auth/me');
    return response.data;
  },

  /**
   * 현재 사용자가 관리자 권한을 가지고 있는지 확인하는 API입니다.
   * @returns 관리자 권한 여부를 반환합니다.
   */
  CHECK_ADMIN: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get<AuthMeResponse>('/auth/me');
      return response.data.memberRole === 'ADMIN';
    } catch (error) {
      console.error('[AUTH API] CHECK_ADMIN 에러:', error);
      return false;
    }
  },

  /**
   * 공용 백엔드의 Google OAuth 로그인을 시작합니다.
   * 로그인 후 현재(rating) 호스트로 되돌아오며, 쿠키는 *.hiarc-official.com 도메인에서 공유됩니다.
   */
  GOOGLE_LOGIN: (): void => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const hostOnly = new URL(window.location.href).host;
    const refererParam = encodeURIComponent(hostOnly);
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google?target_url=${refererParam}`;
  },

  /**
   * 로그아웃 처리 및 토큰을 만료시키는 API입니다.
   * @returns void
   */
  LOGOUT: async (): Promise<void> => {
    await apiClient.post('/auth/refresh/logout');
  },
};
