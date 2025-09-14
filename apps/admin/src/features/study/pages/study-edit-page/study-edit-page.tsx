'use client';

import { StudyFormWrapper } from '../../components/study-form-wrapper.tsx/StudyFormWrapper';
import { useParams, useRouter } from 'next/navigation';
import { BackButton, Divider, Title } from '@hiarc-platform/ui';

export function StudyEditPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const studyId = typeof params.id === 'string' ? Number(params.id) : undefined;

  const handleBackClick = (): void => {
    router.back();
  };

  return (
    <div className="flex flex-col pt-10 md:pt-0">
      <BackButton onClick={handleBackClick} className="hidden md:flex" />
      <Title size="sm" weight="bold" className="mt-4">
        스터디 수정 정보
      </Title>
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <StudyFormWrapper studyId={studyId} isEditMode={true} />
    </div>
  );
}
