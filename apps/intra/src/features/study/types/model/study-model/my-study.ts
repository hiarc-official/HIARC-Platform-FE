interface RoundStatuses {
  round?: number | null;
  attendanceComplete: boolean | null;
  assignmentComplete: boolean | null;
}

export interface MyStudyProps {
  studyId?: number | null;
  studyName?: string | null;
  roundStatuses?: RoundStatuses | null;
  totalRounds?: number | null;
}

export class MyStudy {
  private props: MyStudyProps;

  constructor(props: MyStudyProps) {
    this.props = props;
  }

  get studyId(): number | null | undefined {
    return this.props.studyId;
  }

  get studyName(): string | null | undefined {
    return this.props.studyName;
  }

  get roundStatuses(): RoundStatuses | null | undefined {
    return this.props.roundStatuses;
  }

  get totalRounds(): number | null | undefined {
    return this.props.totalRounds;
  }

  get round(): number | null | undefined {
    return this.props.roundStatuses?.round;
  }

  toJson(): MyStudyProps {
    return {
      ...this.props,
    };
  }
}
