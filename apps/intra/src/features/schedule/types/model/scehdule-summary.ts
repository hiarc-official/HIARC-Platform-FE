import { Rating } from '@/features/member/types/model/rating';

interface TimeData {
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
  nano?: number | null;
}
interface Study {
  announcementId?: number | null;
  studyName?: string | null;
  scheduleName?: string | null;
  isApplicationSchedule?: boolean | null;
  scheduledAt?: TimeData | null;
}

export interface ScheculeSummaryProps {
  date?: TimeData | null;
  rating?: Rating[] | null;
  study?: Study[] | null;
  general?: Study[] | null;
}
