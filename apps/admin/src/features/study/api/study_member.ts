import { apiClient } from '@/shared/api/client';
import { CreateGroupRequest, StudyGroupList } from '@hiarc-platform/shared';
import { RoundStatus } from '@hiarc-platform/shared/src/types/study/round-status';
import { MemberStatus } from '../types/response/member-status';

export const studyMemberApi = {
  /**
   * 특정 스터디의 멤버 목록과 상태를 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @returns 스터디 멤버 객체 배열을 반환합니다.
   */
  GET_STUDY_GROUP_LIST: async (studyId: number): Promise<StudyGroupList> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/instructor/status`);
      return StudyGroupList.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_MEMBERS 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 강의(공지사항)를 삭제하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param groupData - 수정할 그룹 데이터입니다.
   * @returns void
   */
  CREATE_GROUP: async (studyId: number, groupData: CreateGroupRequest): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/group`, groupData);
    } catch (error) {
      console.error('[STUDY API] CREATE_GROUP 에러:', error);
      throw error;
    }
  },

  /**
   * 수강생 핸들명 검증 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param bojHandle - 학생의 BOJ 핸들입니다.
   * @returns void
   */
  VALIDATE_STUDENT: async (studyId: number, bojHandle: string): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/group/validate-student`, { bojHandle });
    } catch (error) {
      console.error('[STUDY API] VALIDATE_STUDENT 에러:', error);
      throw error;
    }
  },

  /**
   * 스터디 조 수정 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param groupId - 그룹의 ID입니다.
   * @param groupData - 수정할 그룹 데이터입니다.
   * @returns void
   */
  PATCH_GROUP: async (
    studyId: number,
    groupId: number,
    groupData: CreateGroupRequest
  ): Promise<void> => {
    try {
      await apiClient.patch(`/studies/${studyId}/instructor/group/${groupId}`, groupData);
    } catch (error) {
      console.error('[STUDY API] PATCH_GROUP 에러:', error);
      throw error;
    }
  },

  /**
   * 학생 탈퇴 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param memberId - 탈퇴할 학생 ID입니다.
   * @returns void
   */
  WITHDRAW_STUDENT: async (studyId: number, memberId: number): Promise<void> => {
    try {
      await apiClient.delete(`/studies/${studyId}/instructor/students/${memberId}`);
    } catch (error) {
      console.error('[STUDY API] WITHDRAW_STUDENT 에러:', error);
      throw error;
    }
  },

  GET_MEMBER_STATUS: async (studyId: number, memberId: number): Promise<MemberStatus> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/instructor/status/${memberId}`);
      return MemberStatus.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_MEMBER_STATUS 에러:', error);
      throw error;
    }
  },

  UPDATE_MEMBER_STATUS: async (
    studyId: number,
    memberId: number,
    roundStatuses: RoundStatus[]
  ): Promise<void> => {
    try {
      await apiClient.patch(`/studies/${studyId}/instructor/status/${memberId}`, {
        roundStatuses,
      });
    } catch (error) {
      console.error('[STUDY API] UPDATE_MEMBER_STATUS 에러:', error);
      throw error;
    }
  },

  DOWNLOAD_MEMBER_EXCEL: async (studyId: number): Promise<unknown> => {
    try {
      const response = await apiClient.get(`/studies/excel/${studyId}/download`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error('[STUDY API] DOWNLOAD_MEMBER_EXCEL 에러:', error);
      throw error;
    }
  },
};

export type * from '../types/request/study-request';
export type * from '../types/response/study-response';
