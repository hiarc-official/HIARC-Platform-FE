interface TimeData {
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
  nano?: number | null;
}

export interface StudyProps {
  studyId?: number | null;
  name?: string | null;
  studyStatus?: string | null;
  introduction?: string | null;
  language?: string | null;
  currentParticipants?: number | null;
  maxParticipants?: number | null;
  recruitmentStartDate?: string | null;
  recruitmentEndDate?: string | null;
  semesterYear?: number | null;
  semesterType?: string | null;
  scheduledDays?: string[] | null;
  startTime?: TimeData | null;
  studyType?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;
}

export class Study {
  private readonly props: StudyProps;

  constructor(props: StudyProps) {
    this.props = { ...props };
  }

  get studyId(): number | null | undefined {
    return this.props.studyId;
  }

  get name(): string | null | undefined {
    return this.props.name;
  }

  get studyStatus(): string | null | undefined {
    return this.props.studyStatus;
  }

  get introduction(): string | null | undefined {
    return this.props.introduction;
  }

  get language(): string | null | undefined {
    return this.props.language;
  }

  get currentParticipants(): number | null | undefined {
    return this.props.currentParticipants;
  }

  get maxParticipants(): number | null | undefined {
    return this.props.maxParticipants;
  }

  get recruitmentStartDate(): string | null | undefined {
    return this.props.recruitmentStartDate;
  }

  get recruitmentEndDate(): string | null | undefined {
    return this.props.recruitmentEndDate;
  }

  get semesterYear(): number | null | undefined {
    return this.props.semesterYear;
  }

  get semesterType(): string | null | undefined {
    return this.props.semesterType;
  }

  get scheduledDays(): string[] | null | undefined {
    return this.props.scheduledDays;
  }

  get startTime(): TimeData | null | undefined {
    return this.props.startTime;
  }

  get studyType(): string | null | undefined {
    return this.props.studyType;
  }

  get instructorId(): number | null | undefined {
    return this.props.instructorId;
  }

  get instructorName(): string | null | undefined {
    return this.props.instructorName;
  }

  get instructorBojHandle(): string | null | undefined {
    return this.props.instructorBojHandle;
  }

  equals(other?: Study): boolean {
    return Boolean(other) && this.props.studyId === other?.props.studyId;
  }

  compareTo(other: Study): number {
    if (this.props.semesterYear && other.props.semesterYear) {
      if (this.props.semesterYear !== other.props.semesterYear) {
        return other.props.semesterYear - this.props.semesterYear;
      }
    }
    if (this.props.studyId && other.props.studyId) {
      return this.props.studyId - other.props.studyId;
    }
    return 0;
  }

  toJson(): StudyProps {
    return { 
      ...this.props,
      startTime: this.props.startTime ? {
        hour: this.props.startTime.hour,
        minute: this.props.startTime.minute,
        second: this.props.startTime.second,
        nano: this.props.startTime.nano,
      } : null,
    };
  }

  static fromJson(json: any): Study {
    const data: StudyProps = {
      studyId: json.studyId ?? null,
      name: json.name ?? null,
      studyStatus: json.studyStatus ?? null,
      introduction: json.introduction ?? null,
      language: json.language ?? null,
      currentParticipants: json.currentParticipants ?? null,
      maxParticipants: json.maxParticipants ?? null,
      recruitmentStartDate: json.recruitmentStartDate ?? null,
      recruitmentEndDate: json.recruitmentEndDate ?? null,
      semesterYear: json.semesterYear ?? null,
      semesterType: json.semesterType ?? null,
      scheduledDays: json.scheduledDays ? [...json.scheduledDays] : null,
      startTime: json.startTime ? {
        hour: json.startTime.hour ?? null,
        minute: json.startTime.minute ?? null,
        second: json.startTime.second ?? null,
        nano: json.startTime.nano ?? null,
      } : null,
      studyType: json.studyType ?? null,
      instructorId: json.instructorId ?? null,
      instructorName: json.instructorName ?? null,
      instructorBojHandle: json.instructorBojHandle ?? null,
    };
    
    return new Study(data);
  }

  copyWith(updates: Partial<StudyProps>): Study {
    return new Study({
      ...this.props,
      ...updates,
    });
  }
}