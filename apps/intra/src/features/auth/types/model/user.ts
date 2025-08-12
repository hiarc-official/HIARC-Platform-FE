export interface UserProps {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  provider?: 'google' | 'kakao' | 'naver' | null;
  createdAt?: Date | null;
}

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get email(): string | null {
    return this.props.email ?? null;
  }

  get name(): string | null {
    return this.props.name ?? null;
  }

  get provider(): 'google' | 'kakao' | 'naver' | null {
    return this.props.provider ?? null;
  }

  get createdAt(): Date | null {
    return this.props.createdAt ?? null;
  }

  toJson(): any {
    return {
      id: this.props.id,
      email: this.props.email,
      name: this.props.name,
      provider: this.props.provider,
      createdAt: this.props.createdAt,
    };
  }

  static fromJson(json: any): User {
    return new User({
      id: json?.id ?? null,
      email: json?.email ?? null,
      name: json?.name ?? null,
      provider: json?.provider ?? null,
      createdAt: json?.createdAt ? new Date(json.createdAt) : null,
    });
  }

  copyWith(updates: Partial<UserProps>): User {
    return new User({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: User): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: User): number {
    const thisCreated = this.props.createdAt ? this.props.createdAt.getTime() : 0;
    const otherCreated = other.props.createdAt ? other.props.createdAt.getTime() : 0;
    return otherCreated - thisCreated;
  }
}
