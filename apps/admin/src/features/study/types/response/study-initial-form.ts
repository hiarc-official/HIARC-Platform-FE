export interface StudyInitialForm {
  name?: string;
  handle?: string;
  semesterId?: number;
  startDate?: string | null;
  endDate?: string | null;
  daysOfWeek?: string[];
  startTime?: string | null;
  isOnline?: 'ONLINE' | 'IN_PERSON' | null;
  lang?: string | null;
  introduction?: string | null;
  recruitmentStartAt?: string | null;
  recruitmentEndAt?: string | null;
  precaution?: string | null;
  isPublic?: boolean | null;
}

export const StudyInitialForm = {
  fromJson(json: unknown): StudyInitialForm {
    const data = (json || {}) as Record<string, unknown>;
    return {
      name: (data.name as string) || '',
      handle: (data.handle as string) || '',
      semesterId: data.semesterId as number,
      startDate: (data.startDate as string) || null,
      endDate: (data.endDate as string) || null,
      daysOfWeek: (data.daysOfWeek as string[]) || [],
      startTime: (data.endDate as string) || null,
      isOnline: (data.isOnline as 'ONLINE' | 'IN_PERSON') || null,
      lang: (data.lang as string) || null,
      introduction: (data.introduction as string) || null,
      recruitmentStartAt: (data.recruitmentStartAt as string) || null,
      recruitmentEndAt: (data.recruitmentEndAt as string) || null,
      precaution: (data.precaution as string) || null,
      isPublic: data.isPublic === true || data.isPublic === false ? data.isPublic : null,
    };
  },
};
