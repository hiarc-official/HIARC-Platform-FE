export interface CreateStudyRequest {
  name: string;
  bojHandle: string;
  isGroupStudy: boolean;
  semesterId: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  scheduledDays?: string[] | null;
  startTime?: string | null;
  isOnline?: boolean | null;
  isPublic?: boolean | null;
  lang?: string | null;
  introduction?: string | null;
  recruitmentStartAt?: Date | null;
  recruitmentEndAt?: Date | null;
  precaution?: string | null;
}
