import { Award } from '@hiarc-platform/shared';
import { Rating } from './rating';
import { Streak } from './streak';

export interface MyPageData {
  bojHandle?: string | null;
  name?: string | null;
  division?: 'DIV_1' | 'DIV_2' | 'DIV_3' | null;
  tier?:
    | 'UNRATED'
    | 'BRONZE'
    | 'SILVER'
    | 'GOLD'
    | 'PLATINUM'
    | 'DIAMOND'
    | 'RUBY'
    | 'MASTER'
    | null;
  introduction?: string | null;
  rating?: Rating | null;
  streak?: Streak | null;
  award?: Award[] | null;
}

export const MyPageData = {
  fromJson(json: unknown): MyPageData {
    const data = (json || {}) as Record<string, unknown>;

    return {
      bojHandle: (data?.bojHandle as string) ?? null,
      name: (data?.name as string) ?? null,
      division: (data?.division as 'DIV_1' | 'DIV_2' | 'DIV_3') ?? null,
      tier:
        (data?.tier as
          | 'UNRATED'
          | 'BRONZE'
          | 'SILVER'
          | 'GOLD'
          | 'PLATINUM'
          | 'DIAMOND'
          | 'RUBY'
          | 'MASTER') ?? null,
      introduction: (data?.introduction as string) ?? null,
      rating: data?.rating ? Rating.fromJson(data.rating) : null,
      streak: data?.streak ? Streak.fromJson(data.streak) : null,
      award: Array.isArray(data?.award)
        ? data.award.map((award: unknown) => Award.fromJson(award))
        : null,
    };
  },
};
