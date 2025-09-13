'use client';

import { StudyForm } from '@hiarc-platform/ui';
import { useCreateStudy, useStudyInitialForm } from '@/features/study/hooks';
import { useUpdateStudy } from '@/features/study/hooks';
import { CreateStudyRequest } from '@hiarc-platform/shared';
import type { UpdateStudyRequest } from '../../api/study';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import { useValidateInstructor } from '@/features/study/hooks';

interface StudyFormWrapperProps {
  studyId?: number;
  isEditMode?: boolean;
}

export function StudyFormWrapper({
  studyId,
  isEditMode = false,
}: StudyFormWrapperProps = {}): React.ReactElement {
  const createStudyMutation = useCreateStudy();
  const updateStudyMutation = useUpdateStudy();
  const validateInstructorMutation = useValidateInstructor();
  const { data: initialData, isLoading: isLoadingInitialData } = useStudyInitialForm(studyId);

  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { semesterOptions } = useSemesterStore();

  const handleSubmit = async (
    data: CreateStudyRequest | { studyId: number; data: UpdateStudyRequest }
  ): Promise<void> => {
    if ('studyId' in data) {
      // Update mode
      await updateStudyMutation.mutateAsync(data);
    } else {
      // Create mode
      await createStudyMutation.mutateAsync(data);
    }
  };

  const handleValidateInstructor = async (bojHandle: string): Promise<void> => {
    await validateInstructorMutation.mutateAsync(bojHandle);
  };

  return (
    <StudyForm
      initialData={initialData}
      isLoading={isLoadingInitialData}
      isEditMode={isEditMode}
      studyId={studyId}
      semesterOptions={semesterOptions}
      onSubmit={handleSubmit}
      onValidateInstructor={handleValidateInstructor}
      isValidatingInstructor={validateInstructorMutation.isPending}
      isSubmitting={createStudyMutation.isPending || updateStudyMutation.isPending}
    />
  );
}
