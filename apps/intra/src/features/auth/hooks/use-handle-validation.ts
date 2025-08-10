import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { authApi } from '../api/auth';

interface ValidHandleResponse {
  isValid: boolean;
  message?: string;
}

export default function useHandleValidation(
  handle: string,
  enabled: boolean = true
): UseQueryResult<ValidHandleResponse, Error> {
  return useQuery({
    queryKey: ['handle-validation', handle],
    queryFn: () => authApi.CHECK_HANDLE_VALIDITY(handle),
    enabled: enabled && handle.length > 2, // 최소 3글자 이상일 때만 검증
    retry: false,
    staleTime: 5000, // 5초 캐시
  });
}