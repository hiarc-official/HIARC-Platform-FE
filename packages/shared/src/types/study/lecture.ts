export interface Lecture {
  round?: number | null;
  title?: string | null;
  isAttendanceCodeExist?: boolean | null;
  isAttendanceCompleted?: boolean | null;
  isAssignmentExist?: boolean | null;
  isAssignmentCompleted?: boolean | null;
}

export const Lecture = {
  fromJson(json: unknown): Lecture {
    const data = (json || {}) as Record<string, unknown>;
    return {
      round: (data.round as number) || null,
      title: (data.title as string) || null,
      isAttendanceCodeExist: (data.isAttendanceCodeExist as boolean) || null,
      isAttendanceCompleted: (data.isAttendanceCompleted as boolean) || null,
      isAssignmentExist: (data.isAssignmentExist as boolean) || null,
      isAssignmentCompleted: (data.isAssignmentCompleted as boolean) || null,
    };
  },
};
