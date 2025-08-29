/**
 * 숫자 관련 유틸리티 객체
 */
export const NumberUtil = {
  /**
   * 숫자를 통화 형식으로 포맷합니다
   * @param amount 금액
   * @param currency 통화 코드 (기본값: 'USD')
   * @returns 통화 형식의 문자열
   */
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  /**
   * 숫자를 천 단위 구분자와 함께 포맷합니다
   * @param num 숫자
   * @returns 천 단위 구분자가 포함된 문자열
   */
  formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
  },
};