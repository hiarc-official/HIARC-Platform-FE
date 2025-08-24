import { useState } from 'react';
import useSignUp from '@/features/auth/hooks/mutation/use-sign-up';
import useHandleValidation from '@/features/auth/hooks/mutation/use-handle-validation';
import { Grade, AbsenceStatus } from '@/features/auth/types/request/signup-request';

interface SignupFormData {
  name: string;
  phoneAddress: string;
  studentId: string;
  department: string;
  isDoubleMajor: boolean;
  grade: Grade;
  absenceStatus: AbsenceStatus;
  bojHandle: string;
  selectedDepartments: string[];
  languages: string[];
  languageLevel: string;
  motivations: string[];
  expectedActivity: string;
  languagesAsString: string;
  motivationAsString: string;
}

interface FormErrors {
  name?: string;
  phoneAddress?: string;
  studentId?: string;
  department?: string;
  bojHandle?: string;
}

export function useSignupPageState() {
  const signUpMutation = useSignUp();
  const handleValidationMutation = useHandleValidation();

  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    phoneAddress: '',
    studentId: '',
    department: '',
    isDoubleMajor: false,
    grade: Grade.FRESHMAN,
    absenceStatus: AbsenceStatus.ENROLLED,
    bojHandle: '',
    selectedDepartments: [],
    languages: [],
    languageLevel: '',
    motivations: [],
    expectedActivity: '',
    languagesAsString: '',
    motivationAsString: '',
  });

  const [isCustomDepartment, setIsCustomDepartment] = useState(false);
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
        return undefined;
    }
    return undefined;
  };

  const handleInputChange =
    (field: keyof SignupFormData) => (value: string | number | boolean | string[]) => {
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
    if (!formData.bojHandle || formData.bojHandle.length < 3) {
      return;
    }

    handleValidationMutation.mutate(formData.bojHandle, {
      onSuccess: (data) => {
        if (data.isAvailable) {
          setIsHandleValidated(true);
        }
      },
    });
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
      languages: formData.languages,
      languageLevel: formData.languageLevel,
      motivations: formData.motivations,
      expectedActivity: formData.expectedActivity,
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

  return {
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
  };
}
