import { Semester } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

export const semesterApi = {
  GET_SEMESTER_LIST: async (): Promise<Semester[]> => {
    const response = await apiClient.get<Semester[]>('/admin/semesters');
    return response.data.map((semester) => Semester.fromJson(semester));
  },

  CREATE_SEMESTER: async ({
    semesterYear,
    semesterType,
  }: {
    semesterYear: number;
    semesterType: 'FIRST' | 'SECOND';
  }): Promise<Semester> => {
    const response = await apiClient.post<Semester>('/admin/semesters', {
      semesterYear,
      semesterType,
    });
    return Semester.fromJson(response.data);
  },
};
