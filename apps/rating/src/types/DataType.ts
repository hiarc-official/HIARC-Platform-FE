export enum Division {
  DIV_1 = 1,
  DIV_2 = 2,
  DIV_3 = 3,
}

export interface DivData {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
}
export interface Streak {
  today: string;
  streakStartAt: string;
  currentTotalStreak: number;
  currentSeasonStreak: number;
}

export interface StreakData {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  division: string;
  streak: Streak;
}

export interface EventData {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
}

export interface HitingDataState {
  div1Ranking: DivData[];
  div2Ranking: DivData[];
  div3Ranking: DivData[];
  streakRanking: StreakData[];
  eventRanking: EventData[];
}
