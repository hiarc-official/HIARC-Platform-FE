import { LabeledSelector, LabeledSelectButton, Button, LabeledInput } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';

export function SelectButtons(): React.ReactElement {
  return (
    <div className="flex w-full items-end gap-4 rounded-lg border border-gray-200 p-6">
      <LabeledSelector
        label="참여학기"
        placeholder="학기를 선택해주세요"
        options={selectOption['학기']}
      />
      <LabeledSelectButton label="전체상태" options={['전체', '학회원', '휴먼']} />
      <LabeledInput label="이름" placeholder="Placeholder" />
      <div className="flex gap-2">
        <Button variant="whitebg" size="md" className="w-[134px] text-md">
          초기화
        </Button>
        <Button size="md" className="w-[134px] text-md">
          검색
        </Button>
      </div>
    </div>
  );
}
