'use client';

import { Button } from '@hiarc-platform/design-system';

const SolvedButton = ({ handle }: { handle: string }): React.ReactElement => {
  const onClick = (): void => {
    window.open(`https://solved.ac/profile/${handle}`, '_blank');
  };
  return (
    <Button
      onClick={onClick}
      size="xs"
      // ponytail: solved.ac 브랜드 그린 유지 (DS 토큰 대응 없음)
      className="rounded-[24px] bg-[#81c147] px-[15px] text-white"
    >
      solved.ac
    </Button>
  );
};

export default SolvedButton;
