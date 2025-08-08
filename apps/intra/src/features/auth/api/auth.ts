import { apiClient } from '../../../shared/api/client';
import { User } from '../types/model/user';
import { SignupRequest } from '../types/request/signup-request';

interface AuthMeResponse {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'kakao' | 'naver';
  createdAt: string;
}

interface ValidHandleResponse {
  isValid: boolean;
  message?: string;
}

export const authApi = {
  // 비회원 -> 준회원 가입 (OAuth 토큰 필요)
  SIGN_UP: async (signupData: SignupRequest): Promise<User> => {
    const response = await apiClient.post('/auth/signup', signupData);
    return User.fromJson(response.data);
  },

  // AT, RT 갱신 (refresh token cookie 필요)
  REFRESH_TOKEN: async (): Promise<void> => {
    await apiClient.post('/auth/refresh');
  },

  // 토큰 만료/로그아웃 (access & refresh token cookies 필요)
  LOGOUT: async (): Promise<void> => {
    await apiClient.post('/auth/refresh/logout');
  },

  // 로그인한 사용자 정보 조회
  GET_ME: async (): Promise<User> => {
    const response = await apiClient.get<AuthMeResponse>('/auth/me');
    return User.fromJson({
      ...response.data,
      createdAt: response.data.createdAt,
    });
  },

  // 핸들 중복/존재 검증
  CHECK_HANDLE_VALIDITY: async (handle: string): Promise<ValidHandleResponse> => {
    const response = await apiClient.get<ValidHandleResponse>('/auth/valid-handle', {
      params: { handle },
    });
    return response.data;
  },

  // Google OAuth 로그인 리다이렉트
  GOOGLE_LOGIN: (): void => {
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectUrl', currentUrl);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  },

  // Kakao OAuth 로그인 리다이렉트
  KAKAO_LOGIN: (): void => {
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectUrl', currentUrl);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  },

  // Naver OAuth 로그인 리다이렉트
  NAVER_LOGIN: (): void => {
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectUrl', currentUrl);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    window.location.href = `${API_BASE_URL}/oauth2/authorization/naver`;
  },
};

// 타입들을 다시 export
export type { SignupRequest } from '../types/request/signup-request';
