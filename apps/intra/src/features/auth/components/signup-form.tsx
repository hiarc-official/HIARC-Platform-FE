'use client';

import { BojGuideButton } from '@/features/auth/components/boj-guide-button/boj-guide-button';
import { useSignupPageState } from '@/features/auth/hooks/page/use-signup-page-state';
import { Grade, AbsenceStatus } from '@/features/auth/types/request/signup-request';
import {
  Button,
  Label,
  LabeledInput,
  LabeledSelectButton,
  LabeledSelector,
  Title,
} from '@hiarc-platform/ui';

interface SelectData {
  value: string;
  label: string;
}

const gradeOptions: SelectData[] = [
  { value: Grade.FRESHMAN, label: '1학년' },
  { value: Grade.SOPHOMORE, label: '2학년' },
  { value: Grade.JUNIOR, label: '3학년' },
  { value: Grade.SENIOR, label: '4학년' },
  { value: Grade.OVER, label: '5학년 이상' },
];

const doubleMajorOptions: SelectData[] = [
  { value: '복수전공 미진행', label: '복수전공 미진행' },
  { value: '복수전공 진행', label: '복수전공 진행' },
];

const absenceStatusOptions: SelectData[] = [
  { value: AbsenceStatus.ENROLLED, label: '재학 중' },
  { value: AbsenceStatus.ON_LEAVE, label: '일반 휴학' },
  { value: AbsenceStatus.MILITARY_LEAVE, label: '군휴학' },
];

const departmentOptions: SelectData[] = [
  { value: '컴퓨터공학과', label: '컴퓨터공학과' },
  { value: '정보컴퓨터공학부', label: '정보컴퓨터공학부' },
  { value: '컴퓨터데이터공학부', label: '컴퓨터데이터공학부' },
  { value: '자율전공학부', label: '자율전공학부' },
  { value: '기계시스템디자인공학과', label: '기계시스템디자인공학과' },
  { value: '산업데이터공학과', label: '산업데이터공학과' },
  { value: '시각디자인전공', label: '시각디자인전공' },
  { value: '전자전기공학부', label: '전자전기공학부' },
  { value: '기타', label: '기타' },
];

interface SignupFormProps {
  className?: string;
}

export function SignupForm({ className }: SignupFormProps): React.ReactElement {
  const {
    formData,
    errors,
    isCustomDepartment,
    setIsCustomDepartment,
    isHandleValidated,
    signUpMutation,
    handleValidationMutation,
    isFormValid,
    handleInputChange,
    handleValidateHandle,
    handleSubmit,
  } = useSignupPageState();

  return (
    <div className={`flex w-full flex-col gap-4 ${className || ''}`}>
      <Title size="sm" weight="bold" className="justify-center text-gray-900">
        가입하기
      </Title>
      <LabeledInput
        label="이름"
        required={true}
        placeholder="이름을 입력해주세요"
        value={formData.name}
        onChange={(value: string) => handleInputChange('name')(value)}
        error={errors.name}
      />
      <LabeledInput
        label="전화번호"
        required={true}
        placeholder="010-0000-0000"
        value={formData.phoneAddress}
        onChange={(value: string) => {
          const numbersOnly = value.replace(/\D/g, '');
          let formatted = numbersOnly;

          if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
            formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
          } else if (numbersOnly.length > 7) {
            formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
          }

          handleInputChange('phoneAddress')(formatted);
        }}
        error={errors.phoneAddress}
      />
      <LabeledInput
        label="학번"
        required={true}
        placeholder="학번을 입력해주세요"
        value={formData.studentId}
        onChange={(value: string) => handleInputChange('studentId')(value)}
        error={errors.studentId}
      />
      <LabeledSelector
        label="학과"
        placeholder="학과을 입력해주세요"
        required={true}
        options={departmentOptions}
        value={isCustomDepartment ? '기타' : formData.department}
        onChange={(value: string) => {
          if (value === '기타') {
            setIsCustomDepartment(true);
            handleInputChange('department')('');
          } else {
            setIsCustomDepartment(false);
            handleInputChange('department')(value);
          }
        }}
      />
      {isCustomDepartment && (
        <LabeledInput
          label="학과명"
          required={true}
          placeholder="학과명을 입력해주세요"
          value={formData.department}
          onChange={(value: string) => handleInputChange('department')(value)}
          error={errors.department}
        />
      )}
      <LabeledSelectButton
        label="복수전공 여부"
        required={true}
        options={doubleMajorOptions}
        value={formData.isDoubleMajor ? '복수전공 진행' : '복수전공 미진행'}
        onChange={(value: string) =>
          handleInputChange('isDoubleMajor')(value === '복수전공 진행')
        }
      />
      <LabeledSelector
        required={true}
        label="학년"
        placeholder="학년을 입력해주세요"
        options={gradeOptions}
        value={formData.grade}
        onChange={(value: string) => handleInputChange('grade')(value as Grade)}
      />
      <LabeledSelectButton
        label="재학여부"
        required={true}
        options={absenceStatusOptions}
        value={formData.absenceStatus}
        onChange={(value: string) => {
          handleInputChange('absenceStatus')(value as AbsenceStatus);
        }}
      />
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full">
          <Label size="md" weight="medium">
            백준 핸들
          </Label>
          <span className="relative -top-[2px] ml-0.5 text-red">*</span>
        </div>
        <div className="flex w-full items-start gap-2">
          <LabeledInput
            label=""
            placeholder="백준 핸들을 입력해주세요"
            value={formData.bojHandle}
            onChange={(value) => handleInputChange('bojHandle')(value)}
            error={errors.bojHandle}
          />
          <Button
            variant="fill"
            size="md"
            onClick={handleValidateHandle}
            disabled={
              !formData.bojHandle ||
              formData.bojHandle.length < 3 ||
              handleValidationMutation.isPending ||
              isHandleValidated
            }
            className="mt-2"
          >
            {handleValidationMutation.isPending
              ? '확인중...'
              : isHandleValidated
                ? '인증완료'
                : '인증하기'}
          </Button>
        </div>
        <BojGuideButton />
      </div>
      <Button
        variant="fill"
        size="lg"
        className="w-full"
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid || signUpMutation.isPending}
      >
        {signUpMutation.isPending ? '가입 중...' : '회원가입'}
      </Button>
    </div>
  );
}