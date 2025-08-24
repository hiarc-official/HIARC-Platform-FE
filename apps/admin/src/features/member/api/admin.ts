import { Admin, Instructor } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

export const adminApi = {
  GET_ADMINS: async (semesterId: number): Promise<Admin[]> => {
    const response = await apiClient.get('/admin/members/admin', {
      params: { semesterId },
    });
    return response.data.map((item: unknown) => Admin.fromJson(item));
  },

  GET_INSTRUCTORS: async (semesterId: number): Promise<Instructor[]> => {
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

  UPDATE_ADMIN: async ({
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
};
