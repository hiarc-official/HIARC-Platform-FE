export interface StreakData {
  date?: string | null;
  value?: boolean | null;
}

export const StreakData = {
  fromJson(json: unknown): StreakData {
    const data = (json || {}) as Record<string, unknown>;
    return {
      date: (data.date as string) || null,
      value: (data.value as boolean) || null,
    };
  },
};
