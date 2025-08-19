export interface AnnouncementSummary {
  announcementId?: number | null;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null;
  title?: string | null;
  authorId?: number | null;
  authorName?: string | null;
  createdAt?: Date | null;
  isPublic?: boolean | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
}

export const AnnouncementSummary = {
  fromJson(json: unknown): AnnouncementSummary {
    const data = (json || {}) as Record<string, unknown>;
    return {
      announcementId: (data.announcementId as number) || null,
      announcementType: (data.announcementType as AnnouncementSummary['announcementType']) || null,
      title: (data.title as string) || null,
      authorId: (data.authorId as number) || null,
      authorName: (data.authorName as string) || null,
      createdAt: data.createdAt ? new Date(data.createdAt as string) : null,
      isPublic: (data.isPublic as boolean) || null,
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      lectureRound: (data.lectureRound as number) || null,
    };
  },
};
