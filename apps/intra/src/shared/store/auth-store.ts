import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api';
import type { AuthStore } from '../auth';
import type { UserProfile } from '../types/auth/user-profile';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      isInitialized: false,

      // Actions
      setUser: (user: UserProfile | null) => set({ user } as Partial<AuthStore>),

      login: (user: UserProfile) =>
        set({
          user,
          isLoading: false,
        } as Partial<AuthStore>),

      logout: () => {
        set({
          user: null,
          isLoading: false,
        } as Partial<AuthStore>);
      },

      setLoading: (isLoading: boolean) => set({ isLoading } as Partial<AuthStore>),

      // Computed getters
      get isAuthenticated() {
        const state = get();
        return Boolean(state.user);
      },

      initialize: async () => {
        set({ isLoading: true } as Partial<AuthStore>);

        try {
          const user = await authApi.getMe();
          set({ user, isLoading: false, isInitialized: true } as Partial<AuthStore>);
        } catch (error) {
          console.error('Failed to initialize user:', error);

          // 네트워크 오류나 서버 오류 시 자동 로그아웃 처리
          const { logout } = get();
          logout();
          set({ isLoading: false, isInitialized: true } as Partial<AuthStore>);

          // 에러는 이미 API 클라이언트에서 처리되므로 추가 에러 처리 불필요
          // (API 인터셉터에서 글로벌 에러 처리됨)
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
