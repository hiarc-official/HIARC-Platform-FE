import { apiClient } from '../../../shared/api/client';
import { MyInfo } from '../types/model/my-info';
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
  SIGN_UP: async (signupData: SignupRequest): Promise<void> => {
    console.log('[AUTH API] SIGN_UP 요청:', signupData);
    try {
      const response = await apiClient.post('/auth/signup', signupData);
      console.log('[AUTH API] SIGN_UP 성공 - 응답:', response.data);
      console.log('[AUTH API] SIGN_UP 상태 코드:', response.status);
      // 200 OK로 성공만 확인, 데이터는 반환하지 않음
    } catch (error) {
      console.error('[AUTH API] SIGN_UP 에러:', error);
      throw error;
    }
  },

  // AT, RT 갱신 (refresh token cookie 필요)
  REFRESH_TOKEN: async (): Promise<void> => {
    console.log('[AUTH API] REFRESH_TOKEN 요청');
    try {
      const response = await apiClient.post('/auth/refresh');
      console.log('[AUTH API] REFRESH_TOKEN 응답:', response.data);
    } catch (error) {
      console.error('[AUTH API] REFRESH_TOKEN 에러:', error);
      throw error;
    }
  },

  // 토큰 만료/로그아웃 (access & refresh token cookies 필요)
  LOGOUT: async (): Promise<void> => {
    console.log('[AUTH API] LOGOUT 요청');
    try {
      const response = await apiClient.post('/auth/refresh/logout');
      console.log('[AUTH API] LOGOUT 응답:', response.data);
    } catch (error) {
      console.error('[AUTH API] LOGOUT 에러:', error);
      throw error;
    }
  },

  // 로그인한 사용자 정보 조회
  GET_ME: async (): Promise<MyInfo> => {
    console.log('[AUTH API] GET_ME 요청');
    try {
      const response = await apiClient.get<AuthMeResponse>('/auth/me');
      console.log('[AUTH API] GET_ME 응답:', response.data);
      return MyInfo.fromJson({
        ...response.data,
        createdAt: response.data.createdAt,
      });
    } catch (error) {
      console.error('[AUTH API] GET_ME 에러:', error);
      throw error;
    }
  },

  // 핸들 중복/존재 검증
  CHECK_HANDLE_VALIDITY: async (handle: string): Promise<ValidHandleResponse> => {
    console.log('[AUTH API] CHECK_HANDLE_VALIDITY 요청:', { handle });
    try {
      const response = await apiClient.get<ValidHandleResponse>('/auth/valid-handle', {
        params: { handle },
      });
      console.log('[AUTH API] CHECK_HANDLE_VALIDITY 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[AUTH API] CHECK_HANDLE_VALIDITY 에러:', error);
      throw error;
    }
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
