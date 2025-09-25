'use client';

import { Button } from '../../button';

interface ApplicationButtonProps {
  applicationUrl?: string;
  isDisabled: boolean;
}

export function ApplicationButton({ applicationUrl, isDisabled }: ApplicationButtonProps): React.ReactElement {
  const handleClick = () => {
    if (applicationUrl) {
      window.open(applicationUrl, '_blank');
    }
  };

  return (
    <Button
      size="xs"
      variant="line"
      className="ml-auto flex-shrink-0 border-primary-100 text-primary-100"
      disabled={isDisabled}
      onClick={handleClick}
    >
      신청하기
    </Button>
  );
}