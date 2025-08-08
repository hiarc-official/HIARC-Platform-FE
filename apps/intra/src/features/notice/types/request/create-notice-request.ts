export interface CreateNoticeRequest {
  title: string;
  content: string;
  isImportant?: boolean;
}