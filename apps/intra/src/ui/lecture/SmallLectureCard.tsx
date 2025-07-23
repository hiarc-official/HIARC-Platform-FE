'use client';
import WeekSteaker from './WeekSteaker';
import { useState } from 'react';
import { Button } from '@hiarc-platform/ui';
export default function SmallLectureCard({
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
    <div className=" flex h-[88px] w-[335px] flex-col gap-2 border border-gray-200 px-4 py-3">
      {/*위*/}
      <div className=" flex items-center justify-between ">
        <WeekSteaker week={week} />
        <div className="flex items-center gap-2">
          <div className="w-[80px] text-right text-[14px] text-gray-700 ">{classRoom}</div>
          <Button
            onClick={onClick}
            disabled={complete}
            variant="fill_light"
            className="h-8 w-[81px] rounded-sm"
          >
            {complete ? '출석완료' : '출석체크'}
          </Button>
        </div>
      </div>
      {/*아래*/}
      <div className="underline decoration-gray-900 decoration-1 underline-offset-2 ">{study}</div>
    </div>
  );
}
