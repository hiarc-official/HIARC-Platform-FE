'use client';
import WeekSteaker from './WeekSteaker';
import { Button } from '@hiarc-platform/ui';
import Image from 'next/image';
import { useState } from 'react';
export default function LectureCard({
  week,
  study,
  isAdmin,
  classRoom,
}: {
  week: number;
  study: string;
  isAdmin?: boolean;
  classRoom: string;
}): React.ReactElement {
  const [complete, setComplete] = useState(false);
  const onClick = (): void => {
    setComplete(true);
  };
  return (
    <div className="flex h-[56px]  w-full  min-w-[1000px] max-w-[1200px] items-center justify-between border border-gray-200 leading-normal">
      <div className="ml-4 flex gap-[13px] font-medium">
        <WeekSteaker week={week} />
        <div className="underline decoration-gray-900 decoration-1 underline-offset-2 ">
          {study}
        </div>
      </div>
      <div className="mr-4 flex">
        <div className="flex items-center  gap-2">
          <Button
            onClick={onClick}
            disabled={complete}
            variant="fill_light"
            className="h-8 w-[81px] rounded-sm"
          >
            {complete ? '출석완료' : '출석체크'}
          </Button>
          <div className="w-[80px] text-right text-[14px] text-gray-700 ">{classRoom}</div>
        </div>
        {isAdmin && (
          <div className="ml-4 flex gap-4">
            <Image src="Edit.svg" alt="EditButton" width={20} height={20} />
            <Image src="Delete.svg" alt="DeleteButton" width={20} height={20} />
          </div>
        )}
      </div>
    </div>
  );
}
