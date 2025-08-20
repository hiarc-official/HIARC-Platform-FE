'use client';

import { useState } from 'react';
import { BojGuideButton } from '@/features/auth/components/boj-guide-button/boj-guide-button';
import useSignUp from '@/features/auth/hooks/use-sign-up';
import { Grade, AbsenceStatus } from '@/features/auth/types/request/signup-request';
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

interface SignupFormData {
  name: string;
  phoneAddress: string;
  studentId: string;
  department: string;
  isDoubleMajor: boolean;
  grade: Grade;
  absenceStatus: AbsenceStatus;
  bojHandle: string;
}

interface FormErrors {
  name?: string;
  phoneAddress?: string;
  studentId?: string;
  department?: string;
  bojHandle?: string;
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
  { value: AbsenceStatus.ON_LEAVE, label: '휴학 중' },
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

export default function SignUpPage(): React.ReactElement {
  const signUpMutation = useSignUp();

  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    phoneAddress: '',
    studentId: '',
    department: '',
    isDoubleMajor: false,
    grade: Grade.FRESHMAN,
    absenceStatus: AbsenceStatus.ENROLLED,
    bojHandle: '',
  });

  const [isHandleValidated, setIsHandleValidated] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: keyof FormErrors, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) {
          return '이름을 입력해주세요.';
        }
        if (value.trim().length < 2) {
          return '이름은 2글자 이상 입력해주세요.';
        }
        break;
      case 'phoneAddress':
        if (!value.trim()) {
          return '전화번호를 입력해주세요.';
        }
        if (!/^\d{10,11}$/.test(value.replace(/\D/g, ''))) {
          return '올바른 전화번호 형식을 입력해주세요.';
        }
        break;
      case 'studentId':
        if (!value.trim()) {
          return '학번을 입력해주세요.';
        }
        if (!/^[A-Z]\d{6}$/.test(value)) {
          return '올바른 학번 형식을 입력해주세요. (예: B911061)';
        }
        break;
      case 'department':
        if (!value.trim()) {
          return '학과를 선택해주세요.';
        }
        break;
      case 'bojHandle':
        if (!value.trim()) {
          return 'BOJ 핸들을 입력해주세요.';
        }
        if (value.trim().length < 3) {
          return 'BOJ 핸들은 3글자 이상 입력해주세요.';
        }
        break;
      default:
        return undefined; // No validation needed for other fields
    }
    return undefined;
  };

  const handleInputChange = (field: keyof SignupFormData) => (value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'bojHandle') {
      setIsHandleValidated(false);
    }

    if (
      typeof value === 'string' &&
      ['name', 'phoneAddress', 'studentId', 'department', 'bojHandle'].includes(field)
    ) {
      const error = validateField(field as keyof FormErrors, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleValidateHandle = (): void => {
    setIsHandleValidated(true);
  };

  const handleSubmit = (): void => {
    const hasErrors = Object.values(errors).some((error) => error);

    if (hasErrors) {
      return;
    }

    if (!isHandleValidated) {
      alert('백준 핸들을 먼저 인증해주세요.');
      return;
    }

    signUpMutation.mutate({
      name: formData.name,
      phoneAddress: formData.phoneAddress,
      studentId: formData.studentId,
      department: formData.department,
      isDoubleMajor: formData.isDoubleMajor,
      grade: formData.grade,
      absenceStatus: formData.absenceStatus,
      bojHandle: formData.bojHandle,
    });
  };

  const isFormValid =
    formData.name &&
    formData.phoneAddress &&
    formData.studentId &&
    formData.department &&
    formData.grade &&
    formData.absenceStatus &&
    formData.bojHandle &&
    isHandleValidated;

  return (
    <PageLayout
      className="mx-auto max-w-[470px] items-center justify-center gap-4"
      desktopChildren={
        <div className="flex w-full flex-col gap-4">
          <Title size="sm" weight="bold" className="text-gray-900">
            회원가입
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
            placeholder="-없이 숫자만 입력해주세요"
            value={formData.phoneAddress}
            onChange={(value: string) => handleInputChange('phoneAddress')(value)}
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
            value={formData.department}
            onChange={(value: string) => handleInputChange('department')(value)}
          />
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
            <div className="flex w-full items-end gap-2">
              <LabeledInput
                label="BOJ"
                required={true}
                placeholder="백준 핸들을 입력해주세요"
                value={formData.bojHandle}
                onChange={(value) => handleInputChange('bojHandle')(value)}
                error={errors.bojHandle}
              />
              <Button
                variant="fill"
                size="md"
                onClick={handleValidateHandle}
                disabled={!formData.bojHandle}
              >
                {isHandleValidated ? '인증완료' : '인증하기'}
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
      }
    ></PageLayout>
  );
}
