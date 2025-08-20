import { cn, Title } from '@hiarc-platform/ui';
import React from 'react';

interface OnboardingButtonProps {
  className?: string;
}

export function OnboardingButton({ className }: OnboardingButtonProps): React.ReactElement {
  return (
    <button
      className={cn(
        'flex w-full items-center justify-center rounded-xl',
        'bg-gradient-to-r from-primary-100 to-primary-200 py-4',
        'text-white',
        'shadow-sm',
        'transition',
        'hover:opacity-90',
        className
      )}
    >
      <Title className="cursor-pointer text-white" size="sm" weight="bold">
        🚀 2025-2학기 HI-ARC 참여하러 가기
      </Title>
    </button>
  );
}
