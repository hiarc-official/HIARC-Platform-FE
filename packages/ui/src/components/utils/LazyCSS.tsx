import { useEffect, useState } from 'react';

interface LazyCSSProps {
  href: string;
  media?: string;
  id?: string;
}

// CSS를 지연 로딩하는 유틸리티 컴포넌트
export function LazyCSS({ href, media = 'all', id }: LazyCSSProps): JSX.Element | null {
  const [_, setLoaded] = useState(false);

  useEffect(() => {
    // 이미 로드된 CSS인지 확인
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
      setLoaded(true);
      return;
    }

    // 새로운 CSS 링크 생성
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print'; // 초기에는 print로 설정하여 렌더링 차단 방지
    if (id) {
      link.id = id;
    }

    link.onload = () => {
      link.media = media; // 로드 완료 후 적절한 미디어로 변경
      setLoaded(true);
    };

    link.onerror = () => {
      console.warn(`Failed to load CSS: ${href}`);
    };

    document.head.appendChild(link);

    return () => {
      // 컴포넌트 언마운트 시 CSS 제거 (선택사항)
      const linkToRemove = document.querySelector(`link[href="${href}"]`);
      if (linkToRemove) {
        document.head.removeChild(linkToRemove);
      }
    };
  }, [href, media, id]);

  return null;
}

// React DatePicker용 편의 컴포넌트
export function DatePickerCSS(): JSX.Element {
  return (
    <LazyCSS
      href="https://cdn.jsdelivr.net/npm/react-datepicker@6.9.0/dist/react-datepicker.css"
      id="react-datepicker-css"
    />
  );
}
