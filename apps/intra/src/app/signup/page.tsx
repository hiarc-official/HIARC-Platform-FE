'use client';

import { Button, LabeledInput, LabeledSelector, Title } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';

export default function SignUpPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 flex w-full max-w-[390px] flex-col items-center gap-4">
        <Title size="sm" weight="bold" className="mt-8">
          회원가입
        </Title>
        <LabeledInput label="이름" required={true} placeholder="이름을 입력해주세요" />
        <LabeledInput label="전화번호" required={true} placeholder="-없이 숫자만 입력해주세요" />
        <LabeledInput label="학번" required={true} placeholder="학번을 입력해주세요" />
        <LabeledSelector
          required={true}
          label="학년"
          placeholder="학년을 입력해주세요"
          options={selectOption['학년']}
        />
        <LabeledSelector
          label="학과"
          placeholder="학과을 입력해주세요"
          required={true}
          options={selectOption['학과']}
        />
        <div className="flex w-full items-end gap-2">
          <LabeledInput label="BOJ" required={true} placeholder="백준 핸들을 입력해주세요" />
          <Button variant="fill" size="md">
            인증하기
          </Button>
        </div>
        <Button variant="fill" size="lg" className="w-full" type="submit">
          회원가입
        </Button>
      </div>
    </main>
  );
}
