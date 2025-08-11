'use client';
import { Label, LabeledInput, LabeledSelectButton } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { LabeledSelector } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import { LabeledMultiSelect } from './labeled-multi-select';
import { InformaionSection } from './information-section';
import { LabeledTextarea } from '@hiarc-platform/ui';
import { LabeledCalanderInput } from '@hiarc-platform/ui';
import { useState } from 'react';
import { useCreateStudy } from '@/features/study/hooks';
import { useRouter } from 'next/navigation';
import type { CreateStudyRequest } from '@/features/study/types';
export function CreateStudyFrom(): React.ReactElement {
  const router = useRouter();
  const createStudyMutation = useCreateStudy();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    capacity: 0,
    semesterId: 0,
    category: '',
    difficulty: 'BEGINNER' as const,
  });
  
  const [studyPeriod, setStudyPeriod] = useState<[Date | null, Date | null]>([null, null]);
  const [cruitPeriod, setCruitPeriod] = useState<[Date | null, Date | null]>([null, null]);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !studyPeriod[0] || !studyPeriod[1]) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const studyRequest: CreateStudyRequest = {
      ...formData,
      startDate: studyPeriod[0]?.toISOString().split('T')[0] || '',
      endDate: studyPeriod[1]?.toISOString().split('T')[0] || '',
    };

    try {
      await createStudyMutation.mutateAsync(studyRequest);
      router.push('/study');
    } catch (error) {
      console.error('스터디 생성 실패:', error);
    }
  };
  return (
    <div className="mt-8 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-4">
      <Label size="lg" weight="bold">
        기본정보
      </Label>
      <LabeledInput 
        label="스터디명" 
        placeholder="제목을 입력해주세요" 
        value={formData.title}
        onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
      />
      <div className="flex w-full max-w-[600px] items-end gap-2">
        <LabeledInput label="스터디장" placeholder="스터디장의 핸들명을 입력해주세요" />
        <Button variant="fill" size="md" className="w-25 px-9 text-md">
          확인
        </Button>
      </div>
      <div className="flex w-full  items-end gap-2">
        <LabeledSelector
          label="진행 학기"
          placeholder="학기를 선택해주세요"
          options={selectOption['학기']}
        />
        <LabeledCalanderInput
          label="진행기간"
          rangeMode={true}
          value={studyPeriod}
          placeholder="일시를 선택해주세요"
          onChange={(value) => {
            if (Array.isArray(value)) {
              setStudyPeriod(value);
            }
          }}
        />
      </div>

      <div className="flex w-full items-end  gap-2">
        <LabeledMultiSelect
          label="고정 요일"
          options={['월', '화', '수', '목', '금', '토', '일']}
        />
        <LabeledSelector
          label="시작시간"
          placeholder="24시 기준으로 숫자를 입력해주세요."
          options={selectOption['시작시간']}
        />
      </div>

      <div className="flex w-full items-end  gap-2">
        <LabeledSelectButton label="진행방식" options={['대면', '비대면']} />
        <LabeledInput label="언어" placeholder="진행 언어를 입력해주세요." />
      </div>
      <LabeledInput 
        label="스터디 한줄 소개" 
        placeholder="스터디를 한줄 소개해주세요" 
        value={formData.description}
        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
      />
      <InformaionSection cruitPeriod={cruitPeriod} setCruitPeriod={setCruitPeriod} />
      <div className="mt-2 w-full">
        <LabeledTextarea
          label="스터디 신청시 유의사항"
          placeholder="스터디에 대한 소개가 아닌 물리적인 유의사항 위주로 작성해주세요."
        />
      </div>
      <div className="mt-4 flex w-full justify-center">
        <Button 
          className="w-full max-w-[390px]" 
          onClick={handleSubmit}
          disabled={createStudyMutation.isPending}
        >
          {createStudyMutation.isPending ? '생성 중...' : '개설하기'}
        </Button>
      </div>
    </div>
  );
}
