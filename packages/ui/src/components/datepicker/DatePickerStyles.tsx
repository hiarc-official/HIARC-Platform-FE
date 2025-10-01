import { useEffect } from 'react';

// React DatePicker CSS를 동적으로 로드하는 컴포넌트
export function DatePickerStyles() {
  useEffect(() => {
    // CSS가 이미 로드되었는지 확인
    if (document.querySelector('link[href*="react-datepicker"]')) {
      return;
    }

    // 동적으로 CSS 로드
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/node_modules/react-datepicker/dist/react-datepicker.css';
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };

    document.head.appendChild(link);

    return () => {
      // 컴포넌트 언마운트 시 제거 (선택사항)
      document.head.removeChild(link);
    };
  }, []);

  return null;
}
