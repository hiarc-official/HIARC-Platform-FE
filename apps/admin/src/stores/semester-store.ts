import { create } from 'zustand';
import { Semester, SelectOption } from '@hiarc-platform/shared';
import { semesterApi } from '@/features/semester/api/semester';

interface SemesterState {
  semesters: Semester[];
  semesterOptions: SelectOption[];
  selectedSemesterId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchSemesters(): Promise<void>;
  getSemesterOptions(): SelectOption[];
  setSelectedSemester(semesterId: string): void;
  getSelectedSemester(): Semester | null;
}

export const useSemesterStore = create<SemesterState>((set, get) => ({
  semesters: [],
  semesterOptions: [],
  selectedSemesterId: null,
  isLoading: false,
  error: null,

  fetchSemesters: async () => {
    set({ isLoading: true, error: null });
    try {
      const semesters = await semesterApi.GET_SEMESTER_LIST();
      const semesterOptions = semesters.map((semester) => ({
        label: `${semester.semesterYear}년 ${semester.semesterType === 'FIRST' ? '1학기' : '2학기'}`,
        value: semester.semesterId?.toString() || '',
      }));

      set({
        semesters,
        semesterOptions,
        isLoading: false,
        // Set first semester as default if no semester is selected
        selectedSemesterId: get().selectedSemesterId || semesterOptions[0]?.value || null,
      });
    } catch (error) {
      console.error('Failed to fetch semesters:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch semesters',
        isLoading: false,
      });
    }
  },

  getSemesterOptions: () => get().semesterOptions,

  setSelectedSemester: (semesterId: string) => {
    set({ selectedSemesterId: semesterId });
  },

  getSelectedSemester: () => {
    const { semesters, selectedSemesterId } = get();
    return semesters.find((semester) => semester.semesterId?.toString() === selectedSemesterId) || null;
  },
}));
