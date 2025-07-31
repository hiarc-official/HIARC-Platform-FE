import { Button, CategoryChip, Label, Title } from '@hiarc-platform/ui';

export function StudyTitle(): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Title size="sm" weight="bold">
              스터디 정보
            </Title>
            <CategoryChip />
          </div>
          <Label>스터디 관련 소개글</Label>
        </div>
        <div className="flex items-center">
          <Label size="lg" className="text-gray-500">
            모집일
          </Label>
          <Label size="lg" weight="medium" className="ml-4 text-gray-900">
            25.02.22 - 25.02.28
          </Label>
          <Button size="md" className="ml-6">
            신청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
