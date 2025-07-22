'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  LabeledInput,
  LabeledSelectButton,
  LabeledSelector,
  Title,
} from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';

export default function SignUpPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 mb-32 mt-8 flex w-full max-w-[390px] flex-col items-center gap-4">
        <Title size="sm" weight="bold">
          회원가입
        </Title>
        <LabeledInput label="이름" required={true} placeholder="이름을 입력해주세요" />
        <LabeledInput label="전화번호" required={true} placeholder="-없이 숫자만 입력해주세요" />
        <LabeledInput label="학번" required={true} placeholder="학번을 입력해주세요" />
        <LabeledSelector
          label="학과"
          placeholder="학과을 입력해주세요"
          required={true}
          options={selectOption['학과']}
        />
        <LabeledSelectButton
          label="복수전공 여부"
          required={true}
          options={['복수전공 미진행', '복수전공 진행']}
        />
        <LabeledSelector
          required={true}
          label="학년"
          placeholder="학년을 입력해주세요"
          options={selectOption['학년']}
        />

        <LabeledSelectButton
          label="재학여부"
          required={true}
          options={['재학 중', '휴학 중', '졸업']}
        />

        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-end gap-2">
            <LabeledInput label="BOJ" required={true} placeholder="백준 핸들을 입력해주세요" />
            <Button variant="fill" size="md">
              인증하기
            </Button>
          </div>
          <div>
            <Label size="sm" className="text-gray-500">
              혹시 백준이 처음이실까요?
            </Label>
            <Dialog>
              <DialogTrigger asChild>
                <Label size="sm" className="cursor-pointer text-gray-500 underline">
                  자세히 보기
                </Label>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[380px]">
                <DialogHeader>
                  <DialogTitle>백준 가이드</DialogTitle>
                </DialogHeader>
                <DialogDescription>
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
                  <Button size="lg">확인</Button>
                </DialogTrigger>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Button variant="fill" size="lg" className="w-full" type="submit">
          회원가입
        </Button>
      </div>
    </main>
  );
}
