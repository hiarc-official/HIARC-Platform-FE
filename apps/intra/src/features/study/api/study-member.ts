import { apiClient } from '../../../shared/api/client';
import { Assignment } from '@hiarc-platform/shared';
import { AttendanceableStudy } from '../types/request/attendanceable-study';
import { MyStudy } from '../types/model/my-study';
import { MyStudyInfo } from '../types/model/my-study-info';

export const studyMemberApi = {
  GET_MY_STUDIES: async (isCurrent: boolean): Promise<MyStudy[]> => {
    const response = await apiClient.get('/studies/me', {
      params: {
        isCurrent,
      },
    });
    return response.data.map((study: unknown) => MyStudy.fromJson(study));
  },

  GET_ASSIGNMENT: async (studyId: number, lectureId: number): Promise<Assignment> => {
    const response = await apiClient.get(`/studies/${studyId}/lecture/${lectureId}/assignment`);
    return Assignment.fromJson(response.data);
  },

  GET_STUDY_FOR_ATTENDANCE: async (): Promise<AttendanceableStudy> => {
    const response = await apiClient.get('/studies/me/current-for-attendance');
    return AttendanceableStudy.fromJson(response.data);
  },

  CHECK_ATTENDANCE_CODE: async (
    studyId: number,
    lectureRound: number,
    attendanceCode: string
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/lecture/${lectureRound}/attendance-code`, {
      code: attendanceCode,
    });
  },

  GET_MY_STUDY_INFO: async (studyId: number): Promise<MyStudyInfo> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/me`);
      return MyStudyInfo.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_MY_STUDY_INFO 에러:', error);
      throw error;
    }
  },
};
