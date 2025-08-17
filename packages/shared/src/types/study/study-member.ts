export interface RoundStatus {
  round?: number | null;
  attendanceCompleted?: boolean | null;
  assignmentCompleted?: boolean | null;
}

export const RoundStatus = {
  fromJson(json: unknown): RoundStatus {
    const data = (json || {}) as Record<string, unknown>;
    return {
      round: typeof data.round === 'number' ? data.round : null,
      attendanceCompleted:
        typeof data.attendanceCompleted === 'boolean' ? data.attendanceCompleted : null,
      assignmentCompleted:
        typeof data.assignmentCompleted === 'boolean' ? data.assignmentCompleted : null,
    };
  },
};

export interface StudyMember {
  memberId?: number | null;
  memberName?: string | null;
  bojHandle?: string | null;
  attendanceCount?: number | null;
  assignmentCount?: number | null;
  roundStatuses?: RoundStatus[] | null;
  totalRounds?: number | null;
}

export const StudyMember = {
  fromJson(json: unknown): StudyMember {
    const data = (json || {}) as Record<string, unknown>;
    return {
      memberId: typeof data.memberId === 'number' ? data.memberId : null,
      memberName: (data.memberName as string) || null,
      bojHandle: (data.bojHandle as string) || null,
      attendanceCount: typeof data.attendanceCount === 'number' ? data.attendanceCount : null,
      assignmentCount: typeof data.assignmentCount === 'number' ? data.assignmentCount : null,
      roundStatuses: data.roundStatuses
        ? (data.roundStatuses as unknown[]).map((status: unknown) => RoundStatus.fromJson(status))
        : null,
      totalRounds: typeof data.totalRounds === 'number' ? data.totalRounds : null,
    };
  },
};
