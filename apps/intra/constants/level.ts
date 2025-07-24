export const enum Level {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
}

export const LevelIcon: Record<Level, string> = {
  [Level.BASIC]: '/Basic.svg',
  [Level.INTERMEDIATE]: '/Intermediate.svg',
  [Level.EXPERT]: '/Expert.svg',
};

export const KoreanLevel: Record<Level, string> = {
  [Level.BASIC]: '기초',
  [Level.INTERMEDIATE]: '초급',
  [Level.EXPERT]: '중급',
};
