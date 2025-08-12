import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { recruitmentApi } from '../api/recruitment';
import { PageableModel } from '@hiarc-platform/shared';
import { RecruitmentApplication } from '../types/model/recruitment-application';

export default function useRecruitmentApplications(): UseQueryResult<
  PageableModel<RecruitmentApplication>,
  Error
> {
  return useQuery({
    queryKey: ['recruitment', 'applications'],
    queryFn: recruitmentApi.GET_RECRUITMENT_APPLICATIONS,
  });
}