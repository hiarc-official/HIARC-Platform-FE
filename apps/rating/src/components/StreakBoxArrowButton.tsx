'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@hiarc-platform/design-system';

const StreakBoxArrowButton = (): React.ReactElement => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push('/streak')}
      className="group flex w-full cursor-pointer items-center justify-between"
    >
      <Label size="lg" weight="bold" selectable={false} className="cursor-pointer">
        Streak
      </Label>
      <span className="flex items-center gap-0.5 text-sm text-gray-500 transition-colors group-hover:text-gray-900">
        전체보기
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
    </button>
  );
};

export default StreakBoxArrowButton;
