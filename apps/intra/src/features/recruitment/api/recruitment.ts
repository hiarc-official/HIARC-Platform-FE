import { apiClient } from '../../../shared/api/client';
import { Recruitment } from '../types/model/recruitment';
import { RecruitmentApplication } from '../types/model/recruitment-application';
import { RecruitmentApplicationRequest } from '../types/request/recruitment-application-request';
import { PageableModel } from '@/shared/types/pageable-model';

export const recruitmentApi = {
  // 모집 정보 조회
  GET_RECRUITMENT: async (): Promise<Recruitment> => {
    const response = await apiClient.get('/recruitment');
    return new Recruitment(response.data);
  },

  // 모집 지원 (관리자용)
  GET_RECRUITMENT_APPLICATIONS: async (): Promise<PageableModel<RecruitmentApplication>> => {
    const response = await apiClient.get('/admin/recruitment/members');
    return PageableModel.create<RecruitmentApplication>(response.data, RecruitmentApplication);
  },

  // 모집 지원하기
  APPLY_RECRUITMENT: async (applicationData: RecruitmentApplicationRequest): Promise<void> => {
    await apiClient.post('/recruitment/apply', applicationData);
  },

  // 지원자 승인/거부 (관리자용)
  UPDATE_APPLICATION_STATUS: async (
    applicationId: string,
    status: 'APPROVED' | 'REJECTED'
  ): Promise<void> => {
    await apiClient.patch(`/admin/recruitment/members/${applicationId}`, { status });
  },
};

export type { RecruitmentApplicationRequest } from '../types/request/recruitment-application-request';