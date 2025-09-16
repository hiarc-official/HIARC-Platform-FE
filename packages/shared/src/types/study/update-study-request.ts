export interface UpdateStudyRequest {
  startDate?: string;
  endDate?: string;
  scheduledDays?: string[];
  startTime?: string;
  isOnline?: boolean;
  lang?: string;
  introduction?: string;
  recruitmentStartAt?: string;
  recruitmentEndAt?: string;
  precaution?: string;
  isPublic?: boolean;
}