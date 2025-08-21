import { Admin, Instructor, PageableModel, Student, StudentApply } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { StudentRequestParam } from '../types/request/student-request-param';

export const studentApi = {
  // 관리자 공지사항 목록 조회 (페이지네이션)
  GET_RECRUITMENT_LIST: async ({
    semesterId,
    page,
    size,
  }: {
    semesterId: number;
    page: number;
    size: number;
  }): Promise<PageableModel<StudentApply>> => {
    const response = await apiClient.get<PageableModel<StudentApply>>(
      `/admin/recruitment/${semesterId}/members`,
      {
        params: { page, size },
      }
    );
    return PageableModel.fromJson(response.data, StudentApply);
  },
  UPDATE_STUDENT_APPLY: async (
    semesterId: number,
    memberId: number,
    applicationStatus: string
  ): Promise<void> => {
    await apiClient.patch<void>(`/admin/recruitment/${semesterId}/members/${memberId}`, {
      applicationStatus,
    });
  },
  START_RECRUITMENT: async (semesterId: number): Promise<void> => {
    await apiClient.post<void>(`/admin/recruitment/${semesterId}`);
  },
  GET_STUDENT_LIST: async (
    studentRequestParam: StudentRequestParam
  ): Promise<PageableModel<Student>> => {
    const response = await apiClient.get('/admin/members', {
      params: studentRequestParam,
    });
    return PageableModel.fromJson(response.data, Student);
  },
  GET_ADMIN_LIST: async (semesterId: number): Promise<Admin[]> => {
    const response = await apiClient.get('/admin/members/admin', {
      params: { semesterId },
    });
    return response.data.map((item: unknown) => Admin.fromJson(item));
  },
  GET_INSTRUCTOR_LIST: async (semesterId: number): Promise<Instructor[]> => {
    const response = await apiClient.get('/admin/members/instructor', {
      params: { semesterId },
    });
    return response.data.map((item: unknown) => Instructor.fromJson(item));
  },
  CREATE_ADMIN: async ({
    semesterId,
    bojHandle,
    adminRole,
  }: {
    semesterId: number;
    bojHandle: string;
    adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
  }): Promise<void> => {
    await apiClient.post('/admin/members/admin', {
      semesterId,
      bojHandle,
      adminRole,
    });
  },
  PATCH_ADMIN: async ({
    semesterId,
    memberId,
    adminRole,
  }: {
    semesterId: number;
    memberId: number;
    adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
  }): Promise<void> => {
    await apiClient.patch(`/admin/members/admin/${memberId}`, {
      semesterId,
      adminRole,
    });
  },

  DELETE_ADMIN: async (memberId: number, semesterId: number): Promise<void> => {
    await apiClient.delete(`/admin/members/admin/${memberId}`, {
      data: { semesterId },
    });
  },

  DELETE_MEMBER: async (memberId: number): Promise<void> => {
    await apiClient.post(`/admin/members/${memberId}/withdraw`);
  },

  DOWNLOAD_EXCEL: async (semesterId: number): Promise<void> => {
    await apiClient.get('/admin/members/excel/download', {
      params: { semesterId },
    });
  },
};
