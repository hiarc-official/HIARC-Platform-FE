export interface RecruitmentSummaryProps {
  description?: string | null;
  greetingDescription?: string | null;
}

export class RecruitmentSummary {
  private readonly props: RecruitmentSummaryProps;

  constructor(props: RecruitmentSummaryProps) {
    this.props = props;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get greetingDescription(): string | null {
    return this.props.greetingDescription ?? null;
  }

  toJson(): any {
    return {
      description: this.props.description ?? null,
      greetingDescription: this.props.greetingDescription ?? null,
    };
  }
}
