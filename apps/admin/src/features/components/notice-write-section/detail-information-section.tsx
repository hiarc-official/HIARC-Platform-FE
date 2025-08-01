import { LabeledInput, LabeledTextarea } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';

export default function DetailInformationSection(): React.ReactElement {
  return (
    <div className="flex w-full flex-col gap-4">
      <LabeledInput label="제목" placeholder="제목을 입력해주세요" required={true} />
      <div className="flex gap-4">
        <LabeledInput label="장소" placeholder="장소를 입력해주세요" />
        <LabeledInput label="일시" placeholder="일시를 선택해주세요" />
      </div>
      <LabeledTextarea
        label="본문"
        placeholder="내용을 입력해주세요."
        required={true}
        className=" aspect-[2/1] text-lg"
      />
      <div className="flex flex-col gap-2">
        <LabeledInput label="첨부파일 URL" placeholder="첨부파일 URL" />
        <Button size="md" className="w-[112px]" variant="fill_secondary">
          URL 추가
        </Button>
      </div>
    </div>
  );
}
