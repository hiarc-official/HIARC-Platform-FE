import Image from 'next/image';
export function RecruitSummar(): React.ReactElement {
  return (
    <div className="flex justify-between gap-4 border-b border-t border-b-gray-200 border-t-gray-700 py-6 text-lg">
      <div className="w-full">
        <div className="flex gap-4">
          <div className="text-gray-500">모집시작일</div>
          <div>2025.03.02</div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex gap-4">
          <div className="text-gray-500">모집종료일</div>
          <div>2025.03.02</div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <div className="text-gray-500">모집학기</div>
          <div>1학기</div>
        </div>
        <Image src="/shared-assets/Edit.svg" alt="Edit" width={24} height={24} />
      </div>
    </div>
  );
}
