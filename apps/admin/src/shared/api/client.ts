import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '../store/auth-store';
import { useDialogStore } from '../store/dialog-store';
import { useErrorStore } from '../store/error-store';

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

// Pretty Logger (dio style)
const prettyLog = {
  request: (config: InternalAxiosRequestConfig) => {
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
      console.log(JSON.stringify(response.data, null, 2));
    }

    console.log('📊 Response Headers:');
    console.table(response.headers);
    console.groupEnd();
  },

  error: (error: AxiosError) => {
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
    const { showUnauthorizedDialog } = useDialogStore.getState();
    const { isHandling401, isHandling403, set401Handling, set403Handling } =
      useErrorStore.getState();

    // 401 (인증 실패) → 다이얼로그 표시
    if (error.response?.status === 401 && !originalRequest._retry && !isHandling401) {
      originalRequest._retry = true;
      set401Handling(true);

      clearAuth();
      localStorage.removeItem('auth-storage');

      // 다이얼로그 표시 (홈으로 리다이렉트는 다이얼로그에서 처리)
      showUnauthorizedDialog();

      // 5초 후 플래그 리셋 (다이얼로그 처리 완료 후)
      setTimeout(() => {
        set401Handling(false);
      }, 5000);

      return Promise.reject(error);
    }

    // 403 (권한 없음) → 다이얼로그 표시
    if (error.response?.status === 403) {
      // 이미 처리 중이면 에러를 조용히 무시
      if (isHandling403) {
        console.log('403 에러 이미 처리 중 - 무시');
        return Promise.resolve({
          data: null,
          status: 403,
          statusText: 'Forbidden',
          headers: {},
          config: originalRequest,
        });
      }

      // 첫 번째 403 에러만 처리
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        set403Handling(true);

        console.log('403 에러 처리: 다이얼로그 표시');

        // 다이얼로그 표시
        showUnauthorizedDialog();

        // 5초 후 플래그 리셋
        setTimeout(() => {
          set403Handling(false);
        }, 5000);

        return Promise.resolve({
          data: null,
          status: 403,
          statusText: 'Forbidden',
          headers: {},
          config: originalRequest,
        });
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
