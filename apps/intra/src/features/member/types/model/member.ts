export interface MemberProps {
  id?: string | null;
  username?: string | null;
  email?: string | null;
  name?: string | null;
  bojHandle?: string | null;
  generation?: number | null;
  role?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | null;
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Member {
  private readonly props: MemberProps;

  constructor(props: MemberProps) {
    this.props = props;
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get username(): string | null {
    return this.props.username ?? null;
  }

  get email(): string | null {
    return this.props.email ?? null;
  }

  get name(): string | null {
    return this.props.name ?? null;
  }

  get bojHandle(): string | null {
    return this.props.bojHandle ?? null;
  }

  get generation(): number | null {
    return this.props.generation ?? null;
  }

  get role(): 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | null {
    return this.props.role ?? null;
  }

  get status(): 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | null {
    return this.props.status ?? null;
  }

  get createdAt(): Date | null {
    return this.props.createdAt ?? null;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  toJson(): any {
    return {
      id: this.props.id,
      username: this.props.username,
      email: this.props.email,
      name: this.props.name,
      bojHandle: this.props.bojHandle,
      generation: this.props.generation,
      role: this.props.role,
      status: this.props.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  static fromJson(json: any): Member {
    return new Member({
      id: json?.id ?? null,
      username: json?.username ?? null,
      email: json?.email ?? null,
      name: json?.name ?? null,
      bojHandle: json?.bojHandle ?? null,
      generation: json?.generation ?? null,
      role: json?.role ?? null,
      status: json?.status ?? null,
      createdAt: json?.createdAt ? new Date(json.createdAt) : null,
      updatedAt: json?.updatedAt ? new Date(json.updatedAt) : null,
    });
  }

  copyWith(updates: Partial<MemberProps>): Member {
    return new Member({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: Member): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Member): number {
    const thisCreated = this.props.createdAt ? this.props.createdAt.getTime() : 0;
    const otherCreated = other.props.createdAt ? other.props.createdAt.getTime() : 0;
    return otherCreated - thisCreated;
  }
}