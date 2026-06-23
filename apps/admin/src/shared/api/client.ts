import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '../stores/auth-store';
import { DialogUtil } from '@hiarc-platform/ui';

// In development, use Next.js API route proxy to avoid CORS issues
// In production, use direct API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://test.hiarc-official.com';

// 전역 API 클라이언트
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 중복 에러 처리 방지를 위한 플래그는 이제 store에서 관리

// Pretty Logger (dio style) - Only in development
const prettyLog = {
  request: (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === 'production') {return;}

    const timestamp = new Date().toLocaleTimeString();
    console.group(`🚀 [${timestamp}] ${config.method?.toUpperCase()} ${config.url}`);

    if (config.params && Object.keys(config.params).length > 0) {
      console.log('📝 Query Parameters:');
      console.table(config.params);
    }

    if (config.data) {
      console.log('📦 Request Body:');
      console.log(JSON.stringify(config.data, null, 2));
    }

    console.log('⚙️ Headers:');
    console.table(config.headers);
    console.groupEnd();
  },

  response: (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'production') {return;}

    const timestamp = new Date().toLocaleTimeString();
    const configWithTime = response.config as InternalAxiosRequestConfig & {
      _requestStartTime?: number;
    };
    const duration = configWithTime._requestStartTime
      ? Date.now() - configWithTime._requestStartTime
      : 0;

    console.group(
      `✅ [${timestamp}] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`
    );

    if (response.data) {
      console.log('📥 Response Data:');
      // Blob 데이터는 JSON.stringify하면 안되므로 체크
      if (response.config.responseType === 'blob') {
        console.log('Blob 데이터 (크기:', response.data.size, 'bytes)');
      } else {
        console.log(JSON.stringify(response.data, null, 2));
      }
    }

    console.log('📊 Response Headers:');
    console.table(response.headers);
    console.groupEnd();
  },

  error: (error: AxiosError) => {
    if (process.env.NODE_ENV === 'production') {return;}

    const timestamp = new Date().toLocaleTimeString();
    const config = error.config;
    const response = error.response;

    console.group(
      `❌ [${timestamp}] ${response?.status || 'NETWORK_ERROR'} ${config?.method?.toUpperCase()} ${config?.url}`
    );

    if (response?.data) {
      console.log('💥 Error Response:');
      console.log(JSON.stringify(response.data, null, 2));
    }

    if (error.message) {
      console.log('📝 Error Message:');
      console.log(error.message);
    }

    console.groupEnd();
  },
};

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const configWithTime = config as InternalAxiosRequestConfig & { _requestStartTime?: number };
  configWithTime._requestStartTime = Date.now();
  prettyLog.request(config);
  return config;
});

// 응답 인터셉터
// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    prettyLog.response(response);
    return response;
  },
  async (error) => {
    prettyLog.error(error);
    const originalRequest = error.config;

    const { clearAuth } = useAuthStore.getState();

    // 401 (인증 실패)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      clearAuth();
      localStorage.removeItem('auth-storage');

      // 401 에러 다이얼로그 표시
      DialogUtil.showError('로그인이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.', () => {
        // 확인 버튼 클릭 시 로그인 페이지로 리디렉션
        window.location.href = '/login';
      });

      return Promise.reject(error);
    }

    // 403 (권한 없음)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
