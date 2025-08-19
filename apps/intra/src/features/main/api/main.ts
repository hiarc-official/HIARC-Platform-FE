import { UpcomingSchedule } from '../types/model/upcoming-schedule';
import { apiClient } from '../../../shared/api/client';
import { CalendarSchedule } from '../types/model/calendar-schedule';
import { Schedule } from '../types/model/schedule';
import { StudyNow } from '../types/model/study-now';

export const mainApi = {
  UPCOMING_SCHEDULE: async (): Promise<UpcomingSchedule> => {
    const response = await apiClient.get('/schedule/upcoming');
    return UpcomingSchedule.fromJson(response.data);
  },

  EXTERNAL_SCHEDULE: async (): Promise<Schedule[]> => {
    const response = await apiClient.get('/schedule/external');
    return response.data.map((schedule: unknown) => Schedule.fromJson(schedule));
  },

  CALENDAR_SCHEDULE: async ({
    median,
    range,
  }: {
    median: string;
    range: number;
  }): Promise<CalendarSchedule[]> => {
    const response = await apiClient.get('/schedule/calendar', {
      params: {
        median,
        range,
      },
    });
    return Array.isArray(response.data)
      ? response.data.map((item) => CalendarSchedule.fromJson(item))
      : [];
  },

  STUDIES_NOW: async (): Promise<StudyNow[]> => {
    const response = await apiClient.get('/studies/now');
    return response.data.map((schedule: unknown) => StudyNow.fromJson(schedule));
  },
};
