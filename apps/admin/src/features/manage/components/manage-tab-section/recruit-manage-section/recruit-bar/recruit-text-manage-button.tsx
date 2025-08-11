import Image from 'next/image';
import { RecruitCompleteModalTrigger } from '../recruit-modal/recruit-complete-modal-trigger';
import { RecruitInfromationModalTrigger } from '../recruit-modal/recruit-information-modal-trigger';
interface RecruitButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RecruitTextManageButton({
  isOpen,
  setIsOpen,
}: RecruitButtonProps): React.ReactElement {
  return (
    <div className="relative">
      <div className="rounded border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-[138px] justify-between rounded-md bg-primary-200 px-4 py-2 text-md  text-white"
        >
          모집문구 관리
          <Image src="/shared-assets/Down.svg" alt="down" width={11} height={7} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-[190px] rounded-md border border-gray-200 bg-white p-3">
          <RecruitCompleteModalTrigger />
          <RecruitInfromationModalTrigger />
        </div>
      )}
    </div>
  );
}
