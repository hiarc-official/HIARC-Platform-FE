import { Divider, Label } from '@hiarc-platform/ui';
import Image from 'next/image';

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-full px-6 py-4 sm:px-10">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 sm:text-left">
          <Label size="lg" weight="bold">
            HI-ARC 하이아크
          </Label>
          <Label size="sm" className="text-gray-700">
            홍익대학교 컴퓨터공학과 알고리즘 학회
          </Label>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-gray-600">
          <div className="flex items-center gap-2">
            <Image src="/Instagram.svg" alt="Instagram Icon" width={16} height={16} />
            <Label>@hi-arc.official</Label>
          </div>
          <Divider variant="vertical" size="8px" />
          <div className="flex items-center gap-2">
            <Image src="/Mail.svg" alt="Mail Icon" width={16} height={16} />
            <Label>hiarc.official@gmail.com</Label>
          </div>
          <Divider variant="vertical" size="8px" />
          <div className="flex items-center gap-2">
            <Image src="/Message.svg" alt="Message Icon" width={16} height={16} />
            <Label>@hi-arc</Label>
          </div>
        </div>
      </div>
    </footer>
  );
}
