export interface StudySummaryProps {
  studyId?: number | null;
  activeStatus?: string | null;
  semesterYear?: number | null;
  semesterType?: string | null;
  difficulty?: string | null;
  name?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;
  isEnrolled?: boolean | null;
}

export class StudySummary {
  private readonly props: StudySummaryProps;

  constructor(props: StudySummaryProps) {
    this.props = { ...props };
  }

  get studyId(): number | null | undefined {
    return this.props.studyId;
  }

  get activeStatus(): string | null | undefined {
    return this.props.activeStatus;
  }

  get semesterYear(): number | null | undefined {
    return this.props.semesterYear;
  }

  get semesterType(): string | null | undefined {
    return this.props.semesterType;
  }

  get difficulty(): string | null | undefined {
    return this.props.difficulty;
  }

  get name(): string | null | undefined {
    return this.props.name;
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

  get isEnrolled(): boolean | null | undefined {
    return this.props.isEnrolled;
  }

  equals(other?: StudySummary): boolean {
    return Boolean(other) && this.props.studyId === other?.props.studyId;
  }

  compareTo(other: StudySummary): number {
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

  toJson(): StudySummaryProps {
    return { ...this.props };
  }

  static fromJson(json: any): StudySummary {
    const data: StudySummaryProps = {
      studyId: json.studyId ?? null,
      activeStatus: json.activeStatus ?? null,
      semesterYear: json.semesterYear ?? null,
      semesterType: json.semesterType ?? null,
      difficulty: json.difficulty ?? null,
      name: json.name ?? null,
      instructorId: json.instructorId ?? null,
      instructorName: json.instructorName ?? null,
      instructorBojHandle: json.instructorBojHandle ?? null,
      isEnrolled: json.isEnrolled ?? null,
    };
    
    return new StudySummary(data);
  }

  copyWith(updates: Partial<StudySummaryProps>): StudySummary {
    return new StudySummary({
      ...this.props,
      ...updates,
    });
  }
}
