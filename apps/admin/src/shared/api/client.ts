import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '../store/auth-store';

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

// Pretty Logger (dio style)
const prettyLog = {
  request: (config: any) => {
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

  response: (response: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const duration = response.config._requestStartTime
      ? Date.now() - response.config._requestStartTime
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

  error: (error: any) => {
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
  (config as any)._requestStartTime = Date.now();
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

    // 401 (인증 실패) → 메인 화면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      clearAuth();
      localStorage.removeItem('auth-storage');

      window.location.href = '/';
      return Promise.reject(error);
    }

    // 403 (권한 없음) → Forbidden 페이지
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      clearAuth();
      localStorage.removeItem('auth-storage');

      window.location.href = '/forbidden';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
