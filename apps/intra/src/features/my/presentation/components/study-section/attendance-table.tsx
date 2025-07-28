import { cn, Label } from '@hiarc-platform/ui';
import Image from 'next/image';

function StyledCheckbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick?(): void;
}): React.ReactElement {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onClick}
      className="inline-flex h-4 w-4 cursor-pointer items-center justify-center hover:opacity-80"
    >
      {checked ? (
        <Image src="/Checkbox.svg" alt="checked" width={16} height={16} />
      ) : (
        <div className="inline-block h-4 w-4 rounded-[2px] border border-gray-300 bg-white" />
      )}
    </div>
  );
}

interface AttendanceTableProps {
  attendance: boolean[];
  assignment: boolean[];
  chunkSize?: number;
  className?: string;
}

export function AttendanceTable({
  attendance,
  assignment,
  chunkSize = 8,
  className,
}: AttendanceTableProps): React.ReactElement {
  const maxWeeks = Math.max(attendance.length, assignment.length);
  const att = [...attendance, ...Array(Math.max(0, maxWeeks - attendance.length)).fill(false)];
  const ass = [...assignment, ...Array(Math.max(0, maxWeeks - assignment.length)).fill(false)];

  const numChunks = Math.ceil(maxWeeks / chunkSize);
  const getChunk = (arr: boolean[], idx: number): boolean[] => {
    const start = idx * chunkSize;
    return arr.slice(start, start + chunkSize);
  };

  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      {Array.from({ length: numChunks }).map((_, chunkIdx) => {
        const attArr = getChunk(att, chunkIdx);
        const assArr = getChunk(ass, chunkIdx);

        return (
          <div key={chunkIdx} className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full table-fixed border-separate border-spacing-0 text-center">
              <colgroup>
                {Array.from({ length: chunkSize }).map((_, idx) => (
                  <col key={idx} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th className="bg-gray-100 text-center align-middle font-medium"></th>
                  {Array.from({ length: chunkSize }).map((_, idx) => {
                    const weekNum = chunkIdx * chunkSize + idx;

                    const show = weekNum < maxWeeks;
                    return (
                      <th key={idx} className={'bg-gray-100 px-4 py-2.5 text-center align-middle'}>
                        {show ? <Label size="md">{`${weekNum + 1}주차`}</Label> : null}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-gray-100 py-2.5 text-center align-middle font-bold">
                    <Label size="md" weight="bold">
                      출석
                    </Label>
                  </td>
                  {Array.from({ length: chunkSize }).map((_, idx) => {
                    const checked = attArr[idx];
                    // 데이터가 있는 칸만 체크박스, 나머진 빈 칸
                    return (
                      <td
                        key={idx}
                        className={`align-middle text-center${idx !== chunkSize ? ' border-b border-gray-200' : ''}`}
                      >
                        {chunkIdx * chunkSize + idx < maxWeeks ? (
                          <StyledCheckbox checked={checked} />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="bg-gray-100 py-2.5 text-center align-middle font-bold">
                    <Label size="md" weight="bold">
                      과제
                    </Label>
                  </td>
                  {Array.from({ length: chunkSize }).map((_, idx) => {
                    const checked = assArr[idx];
                    return (
                      <td key={idx} className="text-center align-middle">
                        {chunkIdx * chunkSize + idx < maxWeeks ? (
                          <StyledCheckbox checked={checked} />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
