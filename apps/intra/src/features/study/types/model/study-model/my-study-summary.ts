export interface MyStudySummaryProps {
  studyId?: number | null;
  name?: string | null;
  role?: string | null;
}

export class MyStudySummary {
  private readonly props: MyStudySummaryProps;
  constructor(props: MyStudySummaryProps) {
    this.props = { ...props };
  }

  get studyId(): number | null | undefined {
    return this.props.studyId;
  }

  get name(): string | null | undefined {
    return (this, this.props.name);
  }

  get role(): string | null | undefined {
    return (this, this.props.role);
  }

  toJson(): MyStudySummaryProps {
    return {
      ...this.props,
    };
  }
}
