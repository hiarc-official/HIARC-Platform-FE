'use client';

import { useRouter } from 'next/navigation';
import HeaderInput from '../atoms/HeaderInput';

const Header = (): React.ReactElement => {
  const router = useRouter();

  return (
    <div className="flex h-9 w-full max-w-[1000px] justify-between py-[30px] text-primary max-[480px]:h-[90px] max-[480px]:w-[375px] max-[480px]:flex-col max-[480px]:items-center max-[480px]:justify-start max-[480px]:gap-2.5">
      {/* 데스크탑 좌측 로고 */}
      <a
        href="https://intra.hiarc-official.com"
        className="hidden whitespace-nowrap text-xl font-black text-primary no-underline min-[481px]:block"
      >
        HI-ARC
      </a>

      {/* 모바일 상단 (로고 + 홈) */}
      <div className="flex w-[330px] items-center justify-between min-[481px]:hidden">
        <a
          href="https://intra.hiarc-official.com"
          className="whitespace-nowrap text-xl font-black text-primary no-underline"
        >
          HI-ARC
        </a>
        <button type="button" className="cursor-pointer font-black" onClick={() => router.push('/')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Home.svg" alt="home" />
        </button>
      </div>

      <div className="flex w-2/5 items-center justify-end gap-2.5 whitespace-nowrap max-[480px]:w-[342px]">
        <div className="max-[480px]:hidden">
          <HeaderInput />
        </div>
        <button
          type="button"
          className="hidden cursor-pointer font-black min-[481px]:block"
          onClick={() => router.push('/')}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Home.svg" alt="home" />
        </button>
      </div>

      {/* 모바일 검색 입력 */}
      <div className="flex w-full justify-center min-[481px]:hidden">
        <HeaderInput />
      </div>
    </div>
  );
};

export default Header;
