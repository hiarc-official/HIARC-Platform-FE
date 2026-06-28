'use client';

import HitingBox from '../components/HitingBox';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@hiarc-platform/design-system';

const DivBlock = (): React.ReactElement => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {return;}

    const handleScroll = (): void => {
      const { scrollLeft, clientWidth } = el;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col items-start max-[480px]:items-center">
      <div
        ref={scrollRef}
        className="flex gap-5 justify-start w-full max-[480px]:overflow-x-auto max-[480px]:scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[480px]:[scroll-snap-type:x_mandatory]"
      >
        <div className="flex-[0_0_auto] [scroll-snap-align:center] w-4/5 max-w-[300px] mr-5 last:mr-0 max-[480px]:w-full">
          <HitingBox divNum={1} />
        </div>
        <div className="flex-[0_0_auto] [scroll-snap-align:center] w-4/5 max-w-[300px] mr-5 last:mr-0 max-[480px]:w-full">
          <HitingBox divNum={2} />
        </div>
        <div className="flex-[0_0_auto] [scroll-snap-align:center] w-4/5 max-w-[300px] mr-5 last:mr-0 max-[480px]:w-full">
          <HitingBox divNum={3} />
        </div>
      </div>
      {/*모바일 에서만 보임여*/}
      <div className="flex justify-center gap-2 mt-2.5 min-[481px]:hidden">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-colors duration-300',
              activeIndex === index ? 'bg-primary' : 'bg-[#d3d3d3]'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default DivBlock;
