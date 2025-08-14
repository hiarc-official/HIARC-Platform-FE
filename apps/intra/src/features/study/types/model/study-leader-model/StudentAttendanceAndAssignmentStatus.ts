interface RoundStatuses {
  round?: number | null;
  attendanceCompleted?: boolean | null;
  assignmentCompleted?: boolean | null;
}

export interface StudentAttendanceAndAssignmentStatusProps {
  memberId?: number | null;
  studyName?: string | null;
  memberName?: string | null;
  bojHandle?: string | null;
  roundStatuses?: RoundStatuses | null;
  totalRounds?: number | null;
}

export class StudentAttendanceAndAssignmentStatus {
  private readonly props: StudentAttendanceAndAssignmentStatusProps;
  constructor(props: StudentAttendanceAndAssignmentStatusProps) {
    this.props = { ...props };
  }
  get memberId(): number | null | undefined {
    return this.props.memberId;
  }

  get studyName(): string | null | undefined {
    return this.props.studyName;
  }

  get memberName(): string | null | undefined {
    return this.props.memberName;
  }

  get bojHandle(): string | null | undefined {
    return this.props.bojHandle;
  }

  get roundStatuses(): RoundStatuses | null | undefined {
    return this.props.roundStatuses;
  }

  get totalRounds(): number | null | undefined {
    return this.props.totalRounds;
  }

  // Individual getters for nested roundStatuses properties
  get round(): number | null | undefined {
    return this.props.roundStatuses?.round;
  }

  get attendanceCompleted(): boolean | null | undefined {
    return this.props.roundStatuses?.attendanceCompleted;
  }

  get assignmentCompleted(): boolean | null | undefined {
    return this.props.roundStatuses?.assignmentCompleted;
  }

  toJson(): StudentAttendanceAndAssignmentStatusProps {
    return {
      ...this.props,
    };
  }
}
