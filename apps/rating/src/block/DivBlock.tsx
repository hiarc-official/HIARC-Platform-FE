'use client';

import HitingBox from '../components/HitingBox';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@hiarc-platform/design-system';

const DivBlock = (): React.ReactElement => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    const handleScroll = (): void => {
      const { scrollLeft, clientWidth } = el;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div
        ref={scrollRef}
        className="grid grid-cols-3 gap-5 max-[480px]:flex max-[480px]:gap-4 max-[480px]:overflow-x-auto max-[480px]:scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[480px]:[scroll-snap-type:x_mandatory]"
      >
        {[1, 2, 3].map((divNum) => (
          <div
            key={divNum}
            className="max-[480px]:flex-[0_0_85%] max-[480px]:[scroll-snap-align:center]"
          >
            <HitingBox divNum={divNum} />
          </div>
        ))}
      </div>
      {/* 모바일에서만 보이는 페이지 인디케이터 */}
      <div className="mt-2.5 flex justify-center gap-2 min-[481px]:hidden">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              'h-2 w-2 rounded-full transition-colors duration-300',
              activeIndex === index ? 'bg-primary-300' : 'bg-gray-300'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default DivBlock;
