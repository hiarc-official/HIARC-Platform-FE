'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { ImageUploadTest } from '../components/image-upload-test';

export default function Home(): React.ReactElement {
  return (
    <PageLayout>
      <div className="w-full space-y-8">
        {/* 이미지 업로드 테스트 섹션 */}
        <div className="flex justify-center">
          <ImageUploadTest />
        </div>
      </div>
    </PageLayout>
  );
}
