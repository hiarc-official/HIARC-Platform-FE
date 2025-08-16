import { StartTime } from '../time/time';

export interface Study {
  studyId?: number | null;
  name?: string | null;
  studyStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  introduction?: string | null;
  lang?: string | null;
  currentParticipants?: number | null;
  recruitmentStartDate?: string | null;
  recruitmentEndDate?: string | null;
  semesterYear?: number | null;
  semesterType?: 'FIRST' | 'SECOND' | null;
  scheduledDays?: string[] | null;
  startTime?: StartTime | null;
  isOnline?: boolean | null;
  studyType?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;
  isInstructor?: boolean | null;
  isStudent?: boolean | null;
}

export const Study = {
  fromJson(json: unknown): Study {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyId: (data.studyId as number) || null,
      name: (data.name as string) || null,
      studyStatus:
        (data.studyStatus as 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED') ||
        null,
      introduction: (data.introduction as string) || null,
      lang: (data.lang as string) || null,
      currentParticipants: (data.currentParticipants as number) || null,
      recruitmentStartDate: (data.recruitmentStartDate as string) || null,
      recruitmentEndDate: (data.recruitmentEndDate as string) || null,
      semesterYear: (data.semesterYear as number) || null,
      semesterType: (data.semesterType as 'FIRST' | 'SECOND') || null,
      scheduledDays: (data.scheduledDays as string[]) || null,
      startTime: StartTime.fromJson(data.startTime),
      isOnline: (data.isOnline as boolean) || null,
      studyType: (data.studyType as string) || null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      instructorBojHandle: (data.instructorBojHandle as string) || null,
      isInstructor: (data.isInstructor as boolean) || null,
      isStudent: (data.isStudent as boolean) || null,
    };
  },
};
