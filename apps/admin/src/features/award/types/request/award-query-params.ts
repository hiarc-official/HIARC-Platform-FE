export interface AwardQueryParams {
  organization?: string;
  awardName?: string;
  memberNameHandle?: string;
  awardYear?: number;
  isOfficial?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}
