export interface StudyNow {
  studyId?: number | null;
  studyName?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  introduction?: string | null;
  scheduledDays?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'> | null;
  startTime?: string | null;
  isOnline?: boolean | null;
  activeStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  isEnrolled?: boolean | null;
}

export const StudyNow = {
  fromJson(json: unknown): StudyNow {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      startDate: data.startDate ? new Date(data.startDate as string) : null,
      endDate: data.endDate ? new Date(data.endDate as string) : null,
      introduction: (data.introduction as string) || null,
      scheduledDays:
        (data.scheduledDays as Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>) ||
        null,
      startTime: (data.startTime as string) || null,
      isOnline: (data.isOnline as boolean) || null,
      activeStatus:
        (data.activeStatus as 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED') ||
        null,
      isEnrolled: (data.isEnrolled as boolean) || null,
    };
  },
};
