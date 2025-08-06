'use client';

import { BojGuideButton } from '@/features/signup/components/boj-guide-button';
import {
  Button,
  LabeledInput,
  LabeledSelectButton,
  LabeledSelector,
  PageLayout,
  Title,
} from '@hiarc-platform/ui';

interface SelectData {
  value: string;
  label: string;
}
const selectOption: Record<string, SelectData[]> = {
  학년: [
    { value: '1', label: '1학년' },
    { value: '2', label: '2학년' },
    { value: '3', label: '3학년' },
    { value: '4', label: '4학년' },
    { value: '5', label: '5학년 이상' },
  ],
  학과: [
    { value: '컴퓨터공학과', label: '컴퓨터공학과' },
    { value: '정보컴퓨터공학부', label: '정보컴퓨터공학부' },
    { value: '컴퓨터데이터공학부', label: '컴퓨터데이터공학부' },
    { value: '자율전공학부', label: '자율전공학부' },
    { value: '기계시스템디자인공학과', label: '기계시스템디자인공학과' },
    { value: '산업데이터공학과', label: '산업데이터공학과' },
    { value: '시각디자인전공', label: '시각디자인전공' },
    { value: '전자전기공학부', label: '전자전기공학부' },
    { value: '기타', label: '기타' },
  ],
};

export default function SignUpPage(): React.ReactElement {
  return (
    <PageLayout
      className="mx-auto max-w-[470px] items-center justify-center gap-4"
      desktopChildren={
        <div className="flex w-full flex-col gap-4">
          <Title size="sm" weight="bold" className="text-gray-900">
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
            <BojGuideButton />
          </div>
          <Button variant="fill" size="lg" className="w-full" type="submit">
            회원가입
          </Button>
        </div>
      }
    ></PageLayout>
  );
}
