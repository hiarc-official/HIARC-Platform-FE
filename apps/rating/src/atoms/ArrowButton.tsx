'use client';
import { useRouter } from 'next/navigation';

const ArrowButton = ({ divNum }: { divNum: number }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/div?num=${divNum}`);
  };
  return (
    <button
      onClick={handleClick}
      className="flex justify-between items-center w-[92%] bg-white border-none rounded-[20px] h-[40px] cursor-pointer py-[3px] px-[15px]"
    >
      <div className="text-[20px]">Div{divNum}</div>
      <div className="text-[20px]">{'>'}</div>
    </button>
  );
};

export default ArrowButton;
