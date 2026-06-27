'use client';

import React, { useEffect, useState } from 'react';

interface SlideFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

// ponytail: framer-motion → CSS enter transition. exit 애니메이션은 AnimatePresence가
// 없어 원래도 실행되지 않았으므로 enter만 재현. 라이브러리를 크리티컬 패스에서 제거.
export function SlideFade({
  children,
  className,
  style,
  ...rest
}: SlideFadeProps): React.ReactElement {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(true);
  }, []);

  return (
    <div
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
