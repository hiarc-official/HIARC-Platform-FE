export interface MemberProfileProps {
  id?: string | null;
  username?: string | null;
  name?: string | null;
  bojHandle?: string | null;
  generation?: number | null;
  role?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | null;
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | null;
  profileImageUrl?: string | null;
  bio?: string | null;
  totalStudies?: number | null;
  currentStudies?: number | null;
  completedStudies?: number | null;
}

export class MemberProfile {
  private readonly props: MemberProfileProps;

  constructor(props: MemberProfileProps) {
    this.props = props;
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get username(): string | null {
    return this.props.username ?? null;
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

  get profileImageUrl(): string | null {
    return this.props.profileImageUrl ?? null;
  }

  get bio(): string | null {
    return this.props.bio ?? null;
  }

  get totalStudies(): number | null {
    return this.props.totalStudies ?? null;
  }

  get currentStudies(): number | null {
    return this.props.currentStudies ?? null;
  }

  get completedStudies(): number | null {
    return this.props.completedStudies ?? null;
  }

  toJson(): any {
    return {
      id: this.props.id,
      username: this.props.username,
      name: this.props.name,
      bojHandle: this.props.bojHandle,
      generation: this.props.generation,
      role: this.props.role,
      status: this.props.status,
      profileImageUrl: this.props.profileImageUrl,
      bio: this.props.bio,
      totalStudies: this.props.totalStudies,
      currentStudies: this.props.currentStudies,
      completedStudies: this.props.completedStudies,
    };
  }

  static fromJson(json: any): MemberProfile {
    return new MemberProfile({
      id: json?.id ?? null,
      username: json?.username ?? null,
      name: json?.name ?? null,
      bojHandle: json?.bojHandle ?? null,
      generation: json?.generation ?? null,
      role: json?.role ?? null,
      status: json?.status ?? null,
      profileImageUrl: json?.profileImageUrl ?? null,
      bio: json?.bio ?? null,
      totalStudies: json?.totalStudies ?? null,
      currentStudies: json?.currentStudies ?? null,
      completedStudies: json?.completedStudies ?? null,
    });
  }

  copyWith(updates: Partial<MemberProfileProps>): MemberProfile {
    return new MemberProfile({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: MemberProfile): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: MemberProfile): number {
    const thisUsername = this.props.username ?? '';
    const otherUsername = other.props.username ?? '';
    return thisUsername.localeCompare(otherUsername);
  }
}