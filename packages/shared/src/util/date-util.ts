/**
 * 날짜 관련 유틸리티 객체
 */
export const DateUtil = {
  /**
   * 날짜를 YYYY-MM-DD 형식으로 포맷합니다
   * @param date 날짜 객체 또는 문자열
   * @returns YYYY-MM-DD 형식의 문자열
   */
  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  },

  /**
   * 날짜를 YYYY.MM.DD 형식으로 포맷합니다
   * @param date 날짜 객체 또는 문자열
   * @returns YYYY.MM.DD 형식의 문자열
   */
  formatDateWithDots(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  },

  /**
   * 날짜와 시간을 YYYY.MM.DD 오전/오후 H시 M분 형식으로 포맷합니다
   * @param date 날짜 객체 또는 문자열
   * @returns YYYY.MM.DD 오전/오후 H시 M분 형식의 문자열
   */
  formatDateTimeWithDots(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();

    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

    return `${year}.${month}.${day} ${period} ${displayHour}시${minute > 0 ? ` ${minute}분` : ''}`;
  },

  /**
   * 날짜를 한국어 형식으로 포맷합니다 (예: 7월 1일)
   * @param date 날짜 객체 또는 문자열
   * @returns M월 D일 형식의 문자열
   */
  formatKoreanDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  },
};
