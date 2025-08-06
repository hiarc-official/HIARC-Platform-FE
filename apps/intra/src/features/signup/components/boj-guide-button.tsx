import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from '@hiarc-platform/ui';

export function BojGuideButton(): React.ReactElement {
  return (
    <div>
      <Label size="sm" weight="regular" className="text-gray-500">
        혹시 백준이 처음이실까요?
      </Label>
      <Dialog>
        <DialogTrigger asChild>
          <button className="ml-2 h-auto p-0 font-pretendard text-xs text-gray-900 underline">
            자세히 보기
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[380px]">
          <DialogHeader>
            <DialogTitle>백준 가이드</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <ol className="mt-2 list-decimal space-y-4 pl-5">
              <li>백준(BOJ)과 solved.ac에 관해 알아보기</li>
              <li>
                백준 사이트에 가입한 후, 소속 학교를 홍익대학교로 설정해주세요.
                <br />
                학회 활동 시 활용될 예정입니다.
              </li>
              <li>solved.ac에 가입할 때, 백준 핸들을 연동하여 가입을 완료해주세요.</li>
            </ol>
          </DialogDescription>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full">확인</Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
}
