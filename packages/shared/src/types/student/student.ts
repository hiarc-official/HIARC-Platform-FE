import { Semester } from '../semester/semester';
import { StudySummary } from '../study/study-summary';

export interface Student {
  id?: number | null;
  name?: string | null;
  bojHandle?: string | null;
  studentId?: string | null;
  phoneAddress?: string | null;
  studies?: StudySummary[] | null;
  participatedSemesters?: Semester[] | null;
  memberRole?: 'GUEST' | 'MEMBER' | 'ADMIN' | null;
}

export const Student = {
  fromJson(json: unknown): Student {
    const data = (json || {}) as Record<string, unknown>;
    return {
      id: (data.id as number) || null,
      name: (data.name as string) || null,
      bojHandle: (data.bojHandle as string) || null,
      studentId: (data.studentId as string) || null,
      phoneAddress: (data.phoneAddress as string) || null,
      studies: (data.studies as StudySummary[]) || null,
      participatedSemesters: (data.participatedSemesters as Semester[]) || null,
      memberRole: (data.memberRole as 'GUEST' | 'MEMBER' | 'ADMIN') || null,
    };
  },
};
