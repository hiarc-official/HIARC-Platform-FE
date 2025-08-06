import { apiClient } from '../../../shared/api/client';

// Auth API 함수들
export const authApi = {
  // 회원가입
  SIGN_UP: async (signupData: { email: string; name: string; provider: string }) => {
    const response = await apiClient.post('/auth/signup', signupData);
    return response.data;
  },

  // 토큰 갱신
  REFRESH_TOKEN: async (refreshToken: string) => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  // 로그아웃
  LOGOUT: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // 사용자 정보 조회
  GET_ME: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Google OAuth 로그인 (직접 리다이렉트)
  GOOGLE_LOGIN: () => {
    // 현재 페이지의 전체 URL을 저장하여 로그인 후 돌아올 위치 기록
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectUrl', currentUrl);

    // Google OAuth2 인증 서버로 직접 리다이렉트
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  },
};

export default apiClient;
