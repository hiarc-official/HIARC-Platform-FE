import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { announcementApi } from '../api/announcement';

interface UploadImageParams {
  file: File;
}

interface UploadImageResult {
  resourceKey: string;
  uploadedUrl: string;
}

export const useImageUpload: () => ReturnType<
  typeof useMutation<UploadImageResult, unknown, UploadImageParams>
> = () =>
  useMutation<UploadImageResult, unknown, UploadImageParams>({
    mutationFn: async ({ file }: UploadImageParams): Promise<UploadImageResult> => {
      // 1. presigned URL 가져오기 (파일의 MIME type 전달)
      const { resourceKey, url: presignedUrl } = await announcementApi.GET_IMAGE_UPLOAD_URL(
        file.type
      );

      // 2. presigned URL로 이미지 업로드
      const formData = new FormData();
      formData.append('file', file);

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // 3. 업로드된 이미지의 URL 반환 (presigned URL에서 query parameters 제거)
      const [uploadedUrl] = presignedUrl.split('?');

      return {
        resourceKey,
        uploadedUrl,
      };
    },
  });
