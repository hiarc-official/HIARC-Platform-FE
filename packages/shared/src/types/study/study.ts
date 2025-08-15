import { StartTime } from '../time/time';

export interface Study {
  studyId?: number | null;
  name?: string | null;
  studyStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  introduction?: string | null;
  language?: string | null;
  currentParticipants?: number | null;
  maxParticipants?: number | null;
  recruitmentStartDate?: string | null;
  recruitmentEndDate?: string | null;
  semesterYear?: number | null;
  semesterType?: string | null;
  scheduledDays?: string[] | null;
  startTime?: StartTime | null;
  studyType?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;
  isInstructor?: boolean | null;
  isStudent?: boolean | null;
  studyName?: string | null;
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
      language: (data.language as string) || null,
      currentParticipants: (data.currentParticipants as number) || null,
      maxParticipants: (data.maxParticipants as number) || null,
      recruitmentStartDate: (data.recruitmentStartDate as string) || null,
      recruitmentEndDate: (data.recruitmentEndDate as string) || null,
      scheduledDays: (data.scheduledDays as string[]) || null,
      startTime: StartTime.fromJson(data.startTime),
      studyType: (data.studyType as string) || null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      instructorBojHandle: (data.instructorBojHandle as string) || null,
      isInstructor: (data.isInstructor as boolean) || null,
      isStudent: (data.isStudent as boolean) || null,
    };
  },
};
