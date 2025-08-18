export interface StudentRequestParam {
  name: string;
  bojHandle: string;
  semesterId: number;
  memberRole: 'GUEST' | 'ADMIN';
  page: number;
  size: number;
  sort: string[];
}
