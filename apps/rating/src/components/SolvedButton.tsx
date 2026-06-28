'use client';

const SolvedButton = ({ handle }: { handle: string }): React.ReactElement => {
  const onClick = (): void => {
    window.open(`https://solved.ac/profile/${handle}`, '_blank');
  };
  return (
    <button
      onClick={onClick}
      className="bg-[#81c147] rounded-[24px] border-none px-[15px] py-0 text-white cursor-pointer"
    >
      solved.ac
    </button>
  );
};

export default SolvedButton;
