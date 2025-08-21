'use client';
import { Input } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import Image from 'next/image';
import { LabeledSelector } from '@hiarc-platform/ui';
import { usePathname } from 'next/navigation';
import { useSemesterStoreInit, useSemesterStore } from '@/hooks/use-semester-store';
import Link from 'next/link';
export default function Header(): React.ReactElement {
  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { semesterOptions, selectedSemesterId, setSelectedSemester } = useSemesterStore();

  const pathname = usePathname();
  const tabItems = [
    { label: '학회원관리', value: 'manage' },
    { label: '공지사항', value: 'announcement' },
    { label: '스터디', value: 'study' },
    { label: '대회', value: 'award' },
    { label: '운영진', value: 'staff' },
  ];

  return (
    <header className="w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto flex w-full min-w-[600px] max-w-[1200px] items-center gap-6 px-5 ">
        <Image src="/shared-assets/Logo.svg" alt="HiarcLogo" width={120} height={30} />

        <LabeledSelector
          required={false}
          label=""
          placeholder="학기를 불러오는 입니다..."
          options={semesterOptions}
          value={selectedSemesterId || ''}
          onChange={setSelectedSemester}
          className="mb-2 ml-4 w-[142px] border-gray-900 font-normal"
        />

        <nav className="flex gap-8 overflow-x-auto whitespace-nowrap">
          {tabItems.map(({ label, value }) => {
            const isActive = pathname.includes(`/${value}`);
            return (
              <Link
                key={value}
                href={`/${value}`}
                className={`text-lg ${isActive ? 'font-bold text-black' : 'text-gray-200'}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
