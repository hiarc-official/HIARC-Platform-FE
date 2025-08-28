import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트에서만 사용 가능한 쿠키 유틸리티 클래스
 * next/headers를 사용하므로 Client Component에서는 사용할 수 없습니다
 */
export const ServerCookieUtil = {
  /**
   * env파일에 명시된 access 토큰 키를 반환합니다
   * @returns process.env.ACCESS_TOKEN_KEY
   */
  getAccessTokenKey(): string {
    return process.env.ACCESS_TOKEN_KEY ?? 'access';
  },

  /**
   * 서버사이드에서 쿠키를 읽고 인증 상태를 확인합니다
   * @returns 인증 상태 객체 { isAuthenticated: boolean, token: string | null }
   */
  checkAuth(): { isAuthenticated: boolean; token: string | null } {
    const cookieStore = cookies();
    const authCookie = cookieStore.get(this.getAccessTokenKey());
    const token = authCookie?.value || null;
    const isAuthenticated = Boolean(token);

    return { isAuthenticated, token };
  },

  /**
   * 서버사이드에서 특정 쿠키 값을 읽습니다
   * @param name 쿠키 이름
   * @returns 쿠키 값 또는 null
   */
  getCookie(name: string): string | null {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value || null;
  },

  /**
   * 서버사이드에서 access 토큰이 있는지 확인합니다
   * @returns 토큰이 있으면 true, 없으면 false
   */
  hasAccessToken(): boolean {
    const token = this.getCookie(this.getAccessTokenKey());
    return token !== null && token.trim() !== '';
  },
};
