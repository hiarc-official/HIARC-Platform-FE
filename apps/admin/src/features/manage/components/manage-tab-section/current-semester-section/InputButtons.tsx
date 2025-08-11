import { Button, LabeledInput } from '@hiarc-platform/ui';

export function InputButtons(): React.ReactElement {
  return (
    <div className="flex w-full items-end gap-4 rounded-lg border border-gray-200 p-6 ">
      <LabeledInput label="이름" placeholder="Placeholder" />
      <LabeledInput label="핸들명" placeholder="Placeholder" />
      <div className="flex  gap-2">
        <Button size="md" className="w-[134px] text-md" variant="whitebg">
          초기화
        </Button>
        <Button size="md" className="w-[134px] text-md">
          검색
        </Button>
      </div>
    </div>
  );
}
