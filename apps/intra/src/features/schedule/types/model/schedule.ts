interface ScheduleAttendee {
  memberId?: string | null;
  memberName?: string | null;
  isPresent?: boolean | null;
}

export interface ScheduleProps {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  startTime?: Date | null;
  endTime?: Date | null;
  location?: string | null;
  type?: 'STUDY' | 'EVENT' | 'MEETING' | 'EXAM' | null;
  studyId?: string | null;
  studyTitle?: string | null;
  instructorId?: string | null;
  instructorName?: string | null;
  attendees?: ScheduleAttendee[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Schedule {
  private readonly props: ScheduleProps;

  constructor(props: ScheduleProps) {
    this.props = props;
  }

  get id(): string | null {
    return this.props.id ?? null;
  }

  get title(): string | null {
    return this.props.title ?? null;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get startTime(): Date | null {
    return this.props.startTime ?? null;
  }

  get endTime(): Date | null {
    return this.props.endTime ?? null;
  }

  get location(): string | null {
    return this.props.location ?? null;
  }

  get type(): 'STUDY' | 'EVENT' | 'MEETING' | 'EXAM' | null {
    return this.props.type ?? null;
  }

  get studyId(): string | null {
    return this.props.studyId ?? null;
  }

  get studyTitle(): string | null {
    return this.props.studyTitle ?? null;
  }

  get instructorId(): string | null {
    return this.props.instructorId ?? null;
  }

  get instructorName(): string | null {
    return this.props.instructorName ?? null;
  }

  get attendees(): ScheduleAttendee[] | null {
    return this.props.attendees ?? null;
  }

  get createdAt(): Date | null {
    return this.props.createdAt ?? null;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null;
  }

  get isUpcoming(): boolean {
    return this.props.startTime ? this.props.startTime > new Date() : false;
  }

  get isOngoing(): boolean {
    const now = new Date();
    return this.props.startTime && this.props.endTime ? 
      this.props.startTime <= now && this.props.endTime > now : false;
  }

  get isCompleted(): boolean {
    return this.props.endTime ? this.props.endTime < new Date() : false;
  }

  toJson(): any {
    return {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      location: this.props.location,
      type: this.props.type,
      studyId: this.props.studyId,
      studyTitle: this.props.studyTitle,
      instructorId: this.props.instructorId,
      instructorName: this.props.instructorName,
      attendees: this.props.attendees,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  static fromJson(json: any): Schedule {
    return new Schedule({
      id: json?.id ?? null,
      title: json?.title ?? null,
      description: json?.description ?? null,
      startTime: json?.startTime ? new Date(json.startTime) : null,
      endTime: json?.endTime ? new Date(json.endTime) : null,
      location: json?.location ?? null,
      type: json?.type ?? null,
      studyId: json?.studyId ?? null,
      studyTitle: json?.studyTitle ?? null,
      instructorId: json?.instructorId ?? null,
      instructorName: json?.instructorName ?? null,
      attendees: json?.attendees ?? null,
      createdAt: json?.createdAt ? new Date(json.createdAt) : null,
      updatedAt: json?.updatedAt ? new Date(json.updatedAt) : null,
    });
  }

  copyWith(updates: Partial<ScheduleProps>): Schedule {
    return new Schedule({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: Schedule): boolean {
    return Boolean(other) && this.props.id === other?.props.id;
  }

  compareTo(other: Schedule): number {
    const thisStartTime = this.props.startTime ? this.props.startTime.getTime() : 0;
    const otherStartTime = other.props.startTime ? other.props.startTime.getTime() : 0;
    return thisStartTime - otherStartTime;
  }
}