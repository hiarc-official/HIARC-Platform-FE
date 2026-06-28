'use client';

import { useRouter } from 'next/navigation';

const StreakBoxArrowButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/streak');
  };
  return (
    <div
      className="w-[696px] h-10 rounded-[20px] bg-white flex justify-between items-center cursor-pointer max-[480px]:w-[284px]"
      onClick={handleClick}
    >
      <div className="ml-4">Streak</div>

      <div className="mr-[13px]">{'>'}</div>
    </div>
  );
};

export default StreakBoxArrowButton;
