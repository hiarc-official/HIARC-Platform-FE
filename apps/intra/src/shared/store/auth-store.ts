import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MyInfo } from '@/features/auth/types/model/my-info';

interface AuthState {
  // 상태
  user: MyInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // 액션
  login(user: MyInfo): void;
  logout(): void;
  setUser(user: MyInfo): void;
  setLoading(loading: boolean): void;
  clearAuth(): void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // 로그인
      login: (user: MyInfo) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      // 로그아웃
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      // 사용자 정보 업데이트
      setUser: (user: MyInfo) =>
        set({
          user,
          isAuthenticated: true,
        }),

      // 로딩 상태 설정
      setLoading: (loading: boolean) =>
        set({
          isLoading: loading,
        }),

      // 인증 정보 완전 삭제
      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
