export interface StudySummary {
  studyId?: number | null;
  studyName?: string | null;
  semesterYear?: number | null;
  semesterType?: string | null;
  studyStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;
}

export const StudySummary = {
  fromJson(json: unknown): StudySummary {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      semesterYear: (data.semesterYear as number) || null,
      semesterType: (data.semesterType as string) || null,
      studyStatus:
        (data.studyStatus as 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED') ||
        null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      instructorBojHandle: (data.instructorBojHandle as string) || null,
    };
  },
};
