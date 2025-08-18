export interface StudentApply {
  memberId?: number | null;
  memberName?: string | null;
  bojHandle?: string | null;
  phoneAddress?: string | null;
  studentId?: string | null;
  department?: string | null;
  isDoubleMajor?: boolean | null;
  grade?: 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR' | 'OVER' | null;
  absenceStatus?: 'ENROLLED' | 'ON_LEAVE' | 'MILITARY_LEAVE' | null;
  applicationStatus?: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | null;
}

export const StudentApply = {
  fromJson(json: unknown): StudentApply {
    const data = (json || {}) as Record<string, unknown>;
    return {
      memberId: (data.memberId as number) || null,
      memberName: (data.memberName as string) || null,
      bojHandle: (data.bojHandle as string) || null,
      studentId: (data.studentId as string) || null,
      phoneAddress: (data.phoneAddress as string) || null,
      department: (data.department as string) || null,
      isDoubleMajor: (data.isDoubleMajor as boolean) || null,
      grade: (data.grade as 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR' | 'OVER') || null,
      absenceStatus: (data.absenceStatus as 'ENROLLED' | 'ON_LEAVE' | 'MILITARY_LEAVE') || null,
      applicationStatus:
        (data.applicationStatus as 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED') || null,
    };
  },
};
