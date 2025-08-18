export interface Admin {
  memberId: number;
  memberName: string;
  bojHandle: string;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
  adminStartedAt: Date;
}

export const Admin = {
  fromJson(json: unknown): Admin {
    const data = (json || {}) as Record<string, unknown>;
    return {
      memberId: (data.memberId as number) || 0,
      memberName: (data.memberName as string) || '',
      bojHandle: (data.bojHandle as string) || '',
      adminRole:
        (data.adminRole as 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE') ||
        'PRESIDENT',
      adminStartedAt: (data.adminStartedAt as Date) || new Date(),
    };
  },
};
