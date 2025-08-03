import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useErrorStore } from '../store/error-store';

// Axios 인스턴스 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // 글로벌 에러 처리
    const { showError } = useErrorStore.getState();

    if (error.response) {
      // 서버 응답 에러
      const status = error.response.status;
      let message = '요청 처리 중 오류가 발생했습니다.';

      switch (status) {
        case 401:
          message = '인증이 필요합니다. 다시 로그인해주세요.';
          break;
        case 403:
          message = '접근 권한이 없습니다.';
          break;
        case 404:
          message = '요청한 리소스를 찾을 수 없습니다.';
          break;
        case 429:
          message = '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.';
          break;
        case 500:
          message = '서버 내부 오류가 발생했습니다.';
          break;
        case 502:
        case 503:
        case 504:
          message = '서버가 일시적으로 사용할 수 없습니다.';
          break;
        default:
          message = '알 수 없는 오류가 발생했습니다.';
          break;
      }

      showError(new Error(message), {
        status,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response.data,
      });
    } else if (error.request) {
      // 네트워크 에러
      showError(new Error('네트워크 연결을 확인해주세요.'), {
        type: 'network',
        request: error.request,
      });
    } else {
      // 기타 에러
      showError(new Error('예상치 못한 오류가 발생했습니다.'), {
        type: 'unknown',
        message: error.message,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
