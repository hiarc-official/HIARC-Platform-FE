/**
 * 브라우저 및 서버에서 쿠키를 관리하는 유틸리티 클래스
 */
export const CookieUtil = {
  /**
   * env파일에 명시된 access 토큰 키를 반환합니다
   * @returns process.env.ACCESS_TOKEN_KEY
   */
  getAccessTokenKey(): string {
    return process.env.ACCESS_TOKEN_KEY ?? 'access';
  },

  /**
   * 브라우저에서 쿠키를 읽습니다
   * @param name 쿠키 이름
   * @returns 쿠키 값 또는 null
   */
  getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
      return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || null;
    }
    return null;
  },

  /**
   * 브라우저에서 access 토큰이 있는지 확인합니다
   * @returns 토큰이 있으면 true, 없으면 false
   */
  hasAccessToken(): boolean {
    const token = this.getCookie(this.getAccessTokenKey());
    return token !== null && token.trim() !== '';
  },

  /**
   * 로그아웃 시 모든 인증 관련 데이터를 삭제합니다
   */
  clearAllAuthData(): void {
    console.log('[clearAllAuthData] 시작');

    // localStorage에서 auth 데이터 삭제 (약간의 지연 후)
    setTimeout(() => {
      try {
        console.log(
          '[clearAllAuthData] localStorage 삭제 전:',
          localStorage.getItem('auth-storage')
        );
        localStorage.removeItem('auth-storage');
        console.log(
          '[clearAllAuthData] localStorage 삭제 후:',
          localStorage.getItem('auth-storage')
        );
        console.log('localStorage auth data cleared');
      } catch (error) {
        console.error('Failed to clear localStorage auth data:', error);
      }
    }, 100);

    console.log('[clearAllAuthData] 완료');
  },
};
