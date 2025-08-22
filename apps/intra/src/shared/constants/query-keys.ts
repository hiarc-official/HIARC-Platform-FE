/**
 * Query Keys Factory for Intra App
 * Based on TkDodo's recommendations for React Query key management
 */

export const queryKeys = {
  // Auth related queries
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // Study related queries  
  studies: {
    all: ['studies'] as const,
    lists: () => [...queryKeys.studies.all, 'list'] as const,
    list: (params: any) => [...queryKeys.studies.lists(), params] as const,
    details: () => [...queryKeys.studies.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.studies.details(), id] as const,
    lectures: (studyId: number) => [...queryKeys.studies.detail(studyId), 'lectures'] as const,
    lecture: (studyId: number, lectureId: number) => [...queryKeys.studies.lectures(studyId), lectureId] as const,
    assignments: (studyId: number) => [...queryKeys.studies.detail(studyId), 'assignments'] as const,
    assignment: (studyId: number, assignmentId: number) => [...queryKeys.studies.assignments(studyId), assignmentId] as const,
    attendanceCodes: (studyId: number) => [...queryKeys.studies.detail(studyId), 'attendance-codes'] as const,
    my: () => [...queryKeys.studies.all, 'my'] as const,
  },

  // Announcement related queries
  announcements: {
    all: ['announcements'] as const,
    lists: () => [...queryKeys.announcements.all, 'list'] as const,
    list: (params: any) => [...queryKeys.announcements.lists(), params] as const,
    details: () => [...queryKeys.announcements.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.announcements.details(), id] as const,
    instructor: {
      all: [...queryKeys.announcements.all, 'instructor'] as const,
      lists: () => [...queryKeys.announcements.instructor.all, 'list'] as const,
      list: (params: any) => [...queryKeys.announcements.instructor.lists(), params] as const,
    },
  },

  // Member related queries
  members: {
    all: ['members'] as const,
    my: {
      all: [...queryKeys.members.all, 'my'] as const,
      introduction: () => [...queryKeys.members.my.all, 'introduction'] as const,
    },
  },

  // Award related queries
  awards: {
    all: ['awards'] as const,
    lists: () => [...queryKeys.awards.all, 'list'] as const,
    list: (params: any) => [...queryKeys.awards.lists(), params] as const,
    details: () => [...queryKeys.awards.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.awards.details(), id] as const,
    my: () => [...queryKeys.awards.all, 'my'] as const,
  },

  // Recruitment related queries
  recruitment: {
    all: ['recruitment'] as const,
    applications: () => [...queryKeys.recruitment.all, 'applications'] as const,
  },
} as const;

// Mutation keys for better organization
export const mutationKeys = {
  auth: {
    login: ['auth', 'login'] as const,
    logout: ['auth', 'logout'] as const,
  },
  studies: {
    create: ['studies', 'create'] as const,
    update: ['studies', 'update'] as const,
    delete: ['studies', 'delete'] as const,
    apply: ['studies', 'apply'] as const,
    lectures: {
      create: ['studies', 'lectures', 'create'] as const,
      update: ['studies', 'lectures', 'update'] as const,
      delete: ['studies', 'lectures', 'delete'] as const,
    },
    assignments: {
      create: ['studies', 'assignments', 'create'] as const,
      update: ['studies', 'assignments', 'update'] as const,
      delete: ['studies', 'assignments', 'delete'] as const,
    },
    attendanceCodes: {
      create: ['studies', 'attendance-codes', 'create'] as const,
      check: ['studies', 'attendance-codes', 'check'] as const,
    },
    announcements: {
      create: ['studies', 'announcements', 'create'] as const,
    },
  },
  announcements: {
    create: ['announcements', 'create'] as const,
    update: ['announcements', 'update'] as const,
    delete: ['announcements', 'delete'] as const,
    instructor: {
      update: ['announcements', 'instructor', 'update'] as const,
    },
  },
  members: {
    introduction: {
      update: ['members', 'introduction', 'update'] as const,
    },
  },
  awards: {
    create: ['awards', 'create'] as const,
    update: ['awards', 'update'] as const,
    delete: ['awards', 'delete'] as const,
  },
  recruitment: {
    apply: ['recruitment', 'apply'] as const,
    updateStatus: ['recruitment', 'update-status'] as const,
  },
} as const;