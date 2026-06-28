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

    // 스크롤 중앙에 가장 가까운 카드를 활성 인덱스로
    const handleScroll = (): void => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let min = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - center);
        if (distance < min) {
          min = distance;
          nearest = i;
        }
      });
      setActiveIndex(nearest);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div
        ref={scrollRef}
        className="grid grid-cols-3 gap-5 max-lg:flex max-lg:snap-x max-lg:snap-mandatory max-lg:gap-4 max-lg:overflow-x-auto max-lg:scroll-smooth max-lg:px-[7.5%] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {[1, 2, 3].map((divNum) => (
          <div key={divNum} className="max-lg:flex-[0_0_85%] max-lg:snap-center">
            <HitingBox divNum={divNum} />
          </div>
        ))}
      </div>
      {/* 모바일 페이지 인디케이터 */}
      <div className="mt-2.5 flex justify-center gap-2 lg:hidden">
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
