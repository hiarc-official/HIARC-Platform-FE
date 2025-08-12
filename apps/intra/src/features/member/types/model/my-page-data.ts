import { Award } from '@/features/awards/types/model/award';
import { Rating } from './rating';
import { Streak } from './streak';

export interface MyPageDataProps {
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

export class MyPageData {
  private readonly props: MyPageDataProps;

  constructor(props: MyPageDataProps) {
    console.log('[MyPageData] Constructor called with props:', props);
    this.props = props;
    console.log('[MyPageData] Instance created with awards:', this.props.award);
  }

  get bojHandle(): string | null {
    return this.props.bojHandle ?? null;
  }

  get name(): string | null {
    return this.props.name ?? null;
  }

  get division(): 'DIV_1' | 'DIV_2' | 'DIV_3' | null {
    return this.props.division ?? null;
  }

  get tier():
    | 'UNRATED'
    | 'BRONZE'
    | 'SILVER'
    | 'GOLD'
    | 'PLATINUM'
    | 'DIAMOND'
    | 'RUBY'
    | 'MASTER'
    | null {
    return this.props.tier ?? null;
  }

  get introduction(): string | null {
    return this.props.introduction ?? null;
  }

  get rating(): Rating | null {
    return this.props.rating ?? null;
  }

  get streak(): Streak | null {
    return this.props.streak ?? null;
  }

  get awards(): Award[] | null {
    return this.props.award ?? null;
  }

  toJson(): any {
    return {
      bojHandle: this.props.bojHandle,
      name: this.props.name,
      division: this.props.division,
      tier: this.props.tier,
      introduction: this.props.introduction,
      rating: this.props.rating?.toJson() ?? null,
      streak: this.props.streak?.toJson() ?? null,
      award: this.props.award?.map(award => award.toJson()) ?? null,
    };
  }

  static fromJson(json: any): MyPageData {
    return new MyPageData({
      bojHandle: json?.bojHandle ?? null,
      name: json?.name ?? null,
      division: json?.division ?? null,
      tier: json?.tier ?? null,
      introduction: json?.introduction ?? null,
      rating: json?.rating ? Rating.fromJson(json.rating) : null,
      streak: json?.streak ? Streak.fromJson(json.streak) : null,
      award: json?.award ? json.award.map((award: any) => Award.fromJson(award)) : null,
    });
  }

  copyWith(updates: Partial<MyPageDataProps>): MyPageData {
    return new MyPageData({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: MyPageData): boolean {
    return Boolean(other) && this.props.bojHandle === other?.props.bojHandle;
  }

  compareTo(other: MyPageData): number {
    const thisName = this.props.name ?? '';
    const otherName = other.props.name ?? '';
    return thisName.localeCompare(otherName);
  }
}