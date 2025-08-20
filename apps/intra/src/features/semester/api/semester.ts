import { CurrentSemester, Semester } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

export const semesterApi = {
  GET_SEMESTER_LIST: async (): Promise<Semester[]> => {
    const response = await apiClient.get<Semester[]>('/semesters');
    return response.data.map((semester) => Semester.fromJson(semester));
  },

  CREATE_SEMESTER: async ({
    semesterYear,
    semesterType,
  }: {
    semesterYear: number;
    semesterType: 'FIRST' | 'SECOND';
  }): Promise<Semester> => {
    const response = await apiClient.post<Semester>('/semesters', {
      semesterYear,
      semesterType,
    });
    return Semester.fromJson(response.data);
  },

  GET_CURRENT_SEMESTER: async (): Promise<CurrentSemester> => {
    const response = await apiClient.get<CurrentSemester | null>('/semesters/now');
    return CurrentSemester.fromJson(response.data);
  },
};
