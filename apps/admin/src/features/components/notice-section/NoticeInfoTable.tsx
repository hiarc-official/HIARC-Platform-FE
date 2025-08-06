import { Label, Title } from '@hiarc-platform/ui';
import Image from 'next/image';

export default function NoticeInfoTable(): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-4 py-6">
        <Label size="lg" className="w-[85px]">
          장소
        </Label>
        <Label size="lg" className="w-[288px]">
          한강공원
        </Label>
        <Label size="lg" className="w-[85px]">
          진행일시
        </Label>
        <Label size="lg" className="w-[288px]">
          2025.07.12
        </Label>
      </div>
      <div className=" h-px w-full bg-gray-200"></div>
      <div className="flex gap-[38px] py-6">
        <div className="flex h-[50px] gap-3">
          <Image
            src="/shared-assets/Link.svg"
            alt="Link"
            width={20}
            height={20}
            className="h-[20px] w-[20px]"
          />
          <Label size="lg" weight="bold">
            관련 URL
          </Label>
        </div>
        <div className="flex flex-col gap-2 text-gray-700">
          <a
            href="https://github.com/HIARC-Developers"
            className="underline decoration-gray-700 decoration-1 underline-offset-4"
          >
            https://github.com/HIARC-Developers
          </a>
          <a
            href="https://github.com/HIARC-Developers"
            className="underline decoration-gray-700 decoration-1 underline-offset-4"
          >
            https://github.com/HIARC-Developers
          </a>
        </div>
      </div>
      <div className=" h-px w-full bg-gray-200"></div>
    </div>
  );
}
