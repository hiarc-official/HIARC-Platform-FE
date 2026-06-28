import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3001';

// 전역 API 클라이언트
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pretty Logger (dio style) - Only in development
const prettyLog = {
  request: (config: InternalAxiosRequestConfig & { _requestStartTime?: number }) => {
    if (process.env.NODE_ENV === 'production') {return;}

    const timestamp = new Date().toLocaleTimeString();
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    console.group(`🚀 [${timestamp}] ${config.method?.toUpperCase()} ${fullUrl}`);

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

  response: (response: AxiosResponse & { config: { _requestStartTime?: number } }) => {
    if (process.env.NODE_ENV === 'production') {return;}

    const timestamp = new Date().toLocaleTimeString();
    const duration = response.config._requestStartTime
      ? Date.now() - response.config._requestStartTime
      : 0;

    const fullUrl = `${response.config.baseURL || ''}${response.config.url || ''}`;
    console.group(
      `✅ [${timestamp}] ${response.status} ${response.config.method?.toUpperCase()} ${fullUrl} (${duration}ms)`
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
    if (process.env.NODE_ENV === 'production') {return;}

    const timestamp = new Date().toLocaleTimeString();
    const config = error.config;
    const response = error.response;

    const fullUrl = config ? `${config.baseURL || ''}${config.url || ''}` : 'Unknown URL';
    console.group(
      `❌ [${timestamp}] ${response?.status || 'NETWORK_ERROR'} ${config?.method?.toUpperCase()} ${fullUrl}`
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
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 요청 시작 시간 기록
  (config as InternalAxiosRequestConfig & { _requestStartTime?: number })._requestStartTime =
    Date.now();

  prettyLog.request(config as InternalAxiosRequestConfig & { _requestStartTime?: number });
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse & { config: { _requestStartTime?: number } }) => {
    prettyLog.response(response);
    return response;
  },
  async (error: AxiosError) => {
    prettyLog.error(error);
    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
