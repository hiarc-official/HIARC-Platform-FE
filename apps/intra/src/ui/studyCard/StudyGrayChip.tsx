import Image from 'next/image';
export default function StudyGrayChip({
  type,
  title,
}: {
  type: 'schedule' | 'delivery';
  title: string;
}): React.ReactElement {
  return (
    <div className="flex h-[25px] w-fit items-center gap-1 rounded-md bg-gray-100 px-3 text-md text-gray-700">
      <div>
        {type === 'schedule' ? (
          <Image src="/Schedule.svg" alt="" height={16} width={16} />
        ) : (
          <Image src="/People.svg" alt="" height={16} width={16} />
        )}
      </div>
      <div>{title}</div>
    </div>
  );
}
