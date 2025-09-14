import { StreakData } from './streak-data';

export interface Streak {
  today?: string | null;
  streakData?: StreakData[] | null;
  streakStartAt?: string;
  currentTotalStreak?: number;
  currentSeasonStreak?: number;
}

export const Streak = {
  fromJson(json: unknown): Streak {
    const data = (json || {}) as Record<string, unknown>;
    return {
      today: (data.today as string) || null,
      streakData: data.streakData
        ? (data.streakData as unknown[]).map((data: unknown) => StreakData.fromJson(data))
        : null,
      streakStartAt: (data.streakStartAt as string) || '',
      currentTotalStreak: (data.currentTotalStreak as number) || 0,
      currentSeasonStreak: (data.currentSeasonStreak as number) || 0,
    };
  },
};
