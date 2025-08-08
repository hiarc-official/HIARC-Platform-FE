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
    enabled: enabled && handle.length > 0,
    retry: false,
    staleTime: 0,
  });
}