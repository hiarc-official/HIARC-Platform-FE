import { StartTime } from '../time/time';

export interface CreateStudyRequest {
  name: string;
  handle: string;
  semesterId: number | null;
  startDate?: string | null;
  endDate?: string | null;
  daysOfWeek?: string[] | null;
  startTime?: StartTime | null;
  isOnline?: boolean | null;
  lang?: string | null;
  introduction?: string | null;
  recruitmentStartAt?: string | null;
  recruitmentEndAt?: string | null;
  precaution?: string | null;
}
