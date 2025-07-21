import { Input } from '@hiarc-platform/ui';
import Image from 'next/image';

export default function Header(): React.ReactElement {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-4 sm:px-10">
      <div className="mx-auto flex w-full min-w-[600px] max-w-screen-xl items-center justify-between">
        <Image src="Logo.svg" alt="HiarcLog" width={120} height={30} />
        <div className="flex items-center gap-4">
          <Input type="search" variant="search" placeholder="placeholder" className="" />
        </div>
      </div>
    </header>
  );
}
