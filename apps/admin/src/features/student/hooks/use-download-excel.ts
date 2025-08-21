import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../shared/api/client';

export const useDownloadExcel = () => {
  return useMutation({
    mutationFn: async (semesterId: number) => {
      try {
        const response = await apiClient.get(`/admin/members/excel/download`, {
          params: { semesterId },
          responseType: 'blob',
        });

        // Blob을 파일로 다운로드
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `회원목록_${semesterId}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('[EXCEL DOWNLOAD] 다운로드 실패:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('[EXCEL DOWNLOAD] 다운로드 성공');
    },
    onError: (error) => {
      console.error('[EXCEL DOWNLOAD] 다운로드 실패:', error);
    },
  });
};
