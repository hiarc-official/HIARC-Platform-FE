export interface Semester {
  semesterId?: number | null;
  semesterYear?: number | null;
  semesterType?: 'FIRST' | 'SECOND' | null;
}

export const Semester = {
  fromJson(json: unknown): Semester {
    const data = (json || {}) as Record<string, unknown>;
    return {
      semesterId: (data.semesterId as number) || null,
      semesterYear: (data.semesterYear as number) || null,
      semesterType: (data.semesterType as 'FIRST' | 'SECOND') || null,
    };
  },
};
