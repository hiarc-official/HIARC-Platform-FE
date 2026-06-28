'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import DivButton from '../block/DivButton';

const DivToggleBar = ({
  setSelected,
  selected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
  selected: number;
}) => {
  const router = useRouter();

  const handleClick = (div: number) => {
    setSelected(div);
    router.push(`/div?num=${div}`);
  };

  return (
    <div className="flex h-[30px] w-[181px] items-center justify-center rounded-[15px] bg-primary">
      <DivButton div={1} onClick={() => handleClick(1)} isSelected={selected === 1} />
      <DivButton div={2} onClick={() => handleClick(2)} isSelected={selected === 2} />
      <DivButton div={3} onClick={() => handleClick(3)} isSelected={selected === 3} />
    </div>
  );
};

export default DivToggleBar;
