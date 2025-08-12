import { apiClient } from '../../../shared/api/client';
import { Schedule } from '../types/model/schedule';
import { CreateScheduleRequest } from '../types/request/create-schedule-request';
import { UpdateScheduleRequest } from '../types/request/update-schedule-request';
import { ScheduleQueryParams } from '../types/request/schedule-query-params';
import { PageableModel } from '@hiarc-platform/shared';

export const scheduleApi = {
  // 스케줄 목록 조회
  GET_SCHEDULES: async (params: ScheduleQueryParams = {}): Promise<PageableModel<Schedule>> => {
    const response = await apiClient.get('/schedules', { params });
    return PageableModel.create<Schedule>(response.data, Schedule);
  },

  // 스케줄 상세 조회
  GET_SCHEDULE: async (id: string): Promise<Schedule> => {
    const response = await apiClient.get(`/schedules/${id}`);
    return new Schedule(response.data);
  },

  // 스케줄 생성
  CREATE_SCHEDULE: async (scheduleData: CreateScheduleRequest): Promise<Schedule> => {
    const response = await apiClient.post('/schedules', scheduleData);
    return new Schedule(response.data);
  },

  // 스케줄 수정
  UPDATE_SCHEDULE: async (id: string, scheduleData: UpdateScheduleRequest): Promise<Schedule> => {
    const response = await apiClient.put(`/schedules/${id}`, scheduleData);
    return new Schedule(response.data);
  },

  // 스케줄 삭제
  DELETE_SCHEDULE: async (id: string): Promise<void> => {
    await apiClient.delete(`/schedules/${id}`);
  },

  // 출석 체크/관리 (강사용)
  CHECK_ATTENDANCE: async (scheduleId: string, memberId: string, isPresent: boolean): Promise<void> => {
    await apiClient.post(`/studies/instructor/attendance`, {
      scheduleId,
      memberId,
      isPresent,
    });
  },
};

export type { CreateScheduleRequest } from '../types/request/create-schedule-request';
export type { UpdateScheduleRequest } from '../types/request/update-schedule-request';
export type { ScheduleQueryParams } from '../types/request/schedule-query-params';