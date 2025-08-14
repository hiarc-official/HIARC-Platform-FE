export interface CurrentForAttendanceProps {
  studyId?: number | null;
  studyName?: string | null;
  currentRound?: number | null;
  instructorName?: string | null;
}

export class CurrentForAttendance {
  private props: CurrentForAttendanceProps;

  constructor(props: CurrentForAttendanceProps) {
    this.props = props;
  }

  get studyId(): number | null | undefined {
    return this.props.studyId;
  }

  get studyName(): string | null | undefined {
    return this.props.studyName;
  }

  get currentRound(): number | null | undefined {
    return this.props.currentRound;
  }

  get instructorName(): string | null | undefined {
    return this.props.instructorName;
  }

  toJson(): CurrentForAttendanceProps {
    return {
      ...this.props,
    };
  }
}
