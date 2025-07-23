export default function WeekSteaker({ week }: { week: number }): React.ReactElement {
  return (
    <div className="flex h-[26px] w-[54px] items-center justify-center rounded-md border bg-gray-200 text-sm text-primary-300">
      {week}회차
    </div>
  );
}
