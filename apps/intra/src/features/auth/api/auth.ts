import { apiClient } from '../../../shared/api/client';
import { User } from '../types/model/user';
import { SignupRequest } from '../types/request/signup-request';

// Auth API 함수들
export const authApi = {
  // 회원가입
  SIGN_UP: async (signupData: SignupRequest): Promise<User> => {
    const response = await apiClient.post('/auth/signup', signupData);
    return User.fromJson(response.data);
  },

  // 토큰 갱신
  REFRESH_TOKEN: async (refreshToken: string): Promise<void> => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // 로그아웃
  LOGOUT: async (): Promise<void> => {
    const response = await apiClient.post('/auth/refresh/logout');
    return response.data;
  },

  // 사용자 정보 조회
  GET_ME: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return User.fromJson(response.data);
  },

  // Google OAuth 로그인 (직접 리다이렉트)
  GOOGLE_LOGIN: (): void => {
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectUrl', currentUrl);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  },
};

// 타입들을 다시 export
export type { SignupRequest } from '../types/request/signup-request';
