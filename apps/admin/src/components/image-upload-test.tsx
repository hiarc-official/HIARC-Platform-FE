'use client';

import { useImageUpload } from '../features/announcement/hooks/use-image-upload';
import { useState, useRef } from 'react';

export const ImageUploadTest = (): React.ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useImageUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    try {
      const result = await uploadMutation.mutateAsync({ file: selectedFile });
      setUploadedImageUrl(result.uploadedUrl);
      alert(`업로드 성공!\nResource Key: ${result.resourceKey}\nURL: ${result.uploadedUrl}`);
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드에 실패했습니다.');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold">이미지 업로드 테스트</h2>

      {/* 파일 선택 */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">이미지 파일 선택</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 미리보기 */}
      {previewUrl && (
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">미리보기</label>
          <img
            src={previewUrl}
            alt="미리보기"
            className="h-48 w-full rounded-md border border-gray-300 object-cover"
          />
        </div>
      )}

      {/* 업로드 버튼 */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
          className="flex-1 rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {uploadMutation.isPending ? '업로드 중...' : '업로드'}
        </button>

        <button
          onClick={handleReset}
          className="rounded-md bg-gray-500 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-600"
        >
          초기화
        </button>
      </div>

      {/* 업로드된 이미지 */}
      {uploadedImageUrl && (
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">업로드된 이미지</label>
          <img
            src={uploadedImageUrl}
            alt="업로드된 이미지"
            className="h-48 w-full rounded-md border border-gray-300 object-cover"
          />
          <p className="mt-1 break-all text-xs text-gray-500">URL: {uploadedImageUrl}</p>
        </div>
      )}

      {/* 상태 표시 */}
      {uploadMutation.error && (
        <div className="bg-red-50 border-red-200 rounded-md border p-3">
          <p className="text-red-600 text-sm">
            에러:{' '}
            {uploadMutation.error instanceof Error
              ? uploadMutation.error.message
              : '알 수 없는 오류'}
          </p>
        </div>
      )}
    </div>
  );
};
