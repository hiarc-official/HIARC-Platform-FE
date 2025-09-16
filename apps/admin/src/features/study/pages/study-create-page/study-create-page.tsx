'use client';

import { StudyFormWrapper } from '../../components/study-form-wrapper.tsx/StudyFormWrapper';
import { BackButton, Divider, Title } from '@hiarc-platform/ui';

export function StudyCreatePage(): React.ReactElement {
  const handleBackClick = (): void => {
    window.history.back();
  };

  return (
    <div className="flex flex-col pt-10 md:pt-0">
      <BackButton onClick={handleBackClick} className="hidden md:flex" />
      <Title size="sm" weight="bold" className="mt-4">
        스터디 개설 정보
      </Title>
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <div className="h-px w-full bg-gray-700"></div>
      <StudyFormWrapper />
    </div>
  );
}
