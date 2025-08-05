import type { LoginResponse } from '../types/auth/login-response';
import type { UserProfile } from '../types/auth/user-profile';
import { apiClient } from './client';

// 인증 관련 API
export const authApi = {
  // 구글 로그인 콜백
  googleCallback: async (authCode: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/api/auth/google/callback', {
      code: authCode,
    });
    return response.data;
  },

  // 사용자 정보 조회
  getMe: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/refresh/logout');
  },

  // 토큰 갱신 (필요한 경우)
  refreshToken: async (): Promise<void> => {
    await apiClient.post('/auth/refresh');
  },
};
