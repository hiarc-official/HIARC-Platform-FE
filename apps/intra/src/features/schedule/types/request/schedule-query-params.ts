export interface ScheduleQueryParams {
  page?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
  type?: 'STUDY' | 'EVENT' | 'MEETING' | 'EXAM';
  studyId?: string;
  instructorId?: string;
  sort?: string;
}