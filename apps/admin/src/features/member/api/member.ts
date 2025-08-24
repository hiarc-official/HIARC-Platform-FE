import { PageableModel, Student } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { MemberRequestParam } from '../types/request/member-request-param';
import { AxiosResponse } from 'axios';

export const memberApi = {
  GET_MEMBERS: async (memberRequestParam: MemberRequestParam): Promise<PageableModel<Student>> => {
    const response = await apiClient.get('/admin/members', {
      params: memberRequestParam,
    });
    return PageableModel.fromJson(response.data, Student);
  },

  UPDATE_MEMBER_APPLY: async (
    semesterId: number,
    memberId: number,
    applicationStatus: string
  ): Promise<void> => {
    await apiClient.patch<void>(`/admin/recruitment/${semesterId}/members/${memberId}`, {
      applicationStatus,
    });
  },

  DELETE_MEMBER: async (memberId: number): Promise<void> => {
    await apiClient.post(`/admin/members/${memberId}/withdraw`);
  },

  DOWNLOAD_EXCEL: async (semesterId: number): Promise<AxiosResponse> =>
    await apiClient.get('/admin/members/excel/download', {
      params: { semesterId },
      responseType: 'blob',
    }),
};
