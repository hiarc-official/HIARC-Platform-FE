import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트에서만 사용 가능한 쿠키 유틸리티 클래스
 * next/headers를 사용하므로 Client Component에서는 사용할 수 없습니다.
 * Next 15+에서 cookies()가 비동기이므로 메서드도 async입니다.
 */
export const ServerCookieUtil = {
  getAccessTokenKey(): string {
    return process.env.ACCESS_TOKEN_KEY ?? 'access';
  },

  async checkAuth(): Promise<{ isAuthenticated: boolean; token: string | null }> {
    const cookieStore = await cookies();
    const token = cookieStore.get(this.getAccessTokenKey())?.value || null;
    return { isAuthenticated: Boolean(token), token };
  },

  async getCookie(name: string): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value || null;
  },

  async hasAccessToken(): Promise<boolean> {
    const token = await this.getCookie(this.getAccessTokenKey());
    return token !== null && token.trim() !== '';
  },
};
