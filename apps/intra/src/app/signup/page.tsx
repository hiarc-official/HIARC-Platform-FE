'use client';

import { LabeledSelector } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';

export default function SignUpPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 flex w-full max-w-[390px] flex-col items-center gap-8">
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
      </div>
    </main>
  );
}
