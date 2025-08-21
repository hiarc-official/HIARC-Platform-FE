import { AnnnouncementType } from './announcement-type';
import { SelectOption } from '../select/select-option';

export interface AnnnouncementTypeInfo {
  label: string;
  color: string;
  bgColor: string;
}

const ANNOUNCEMENT_TYPE_INFO_MAP: Record<AnnnouncementType, AnnnouncementTypeInfo> = {
  [AnnnouncementType.STUDY]: {
    label: '스터디',
    color: '#3B82F6', // blue-500
    bgColor: '#DBEAFE', // blue-100
  },
  [AnnnouncementType.RATING]: {
    label: '하이팅',
    color: '#EF4444', // red-500
    bgColor: '#FEE2E2', // red-100
  },
  [AnnnouncementType.GENERAL]: {
    label: '학회일정',
    color: '#059669', // emerald-600
    bgColor: '#D1FAE5', // emerald-100
  },
  [AnnnouncementType.EXTERNAL]: {
    label: '외부',
    color: '#7C3AED', // violet-600
    bgColor: '#EDE9FE', // violet-100
  },
  [AnnnouncementType.ETC]: {
    label: '기타',
    color: '#6B7280', // gray-500
    bgColor: '#F3F4F6', // gray-100
  },
};

/**
 * Category enum을 SelectOption 배열로 변환
 */
export function announcementTypeSelectOption(): SelectOption[] {
  return Object.values(AnnnouncementType).map((category) => ({
    value: category,
    label: ANNOUNCEMENT_TYPE_INFO_MAP[category].label,
  }));
}

/**
 * Category 값으로 라벨과 색상 정보를 반환
 */
export function getAnnouncementTypeInfo(category: AnnnouncementType): AnnnouncementTypeInfo {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category];
}

/**
 * Category 값으로 라벨만 반환
 */
export function getAnnouncementTypeLabel(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].label;
}

/**
 * Category 값으로 색상만 반환
 */
export function getAnnouncementTypeColor(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].color;
}

/**
 * Category 값으로 배경색만 반환
 */
export function getAnnouncementTypeBgColor(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].bgColor;
}

/**
 * 문자열을 AnnouncementType으로 변환
 */
export function getAnnouncementTypeFromString(typeString: string): AnnnouncementType {
  const typeValues = Object.values(AnnnouncementType) as string[];
  return typeValues.includes(typeString)
    ? (typeString as AnnnouncementType)
    : AnnnouncementType.ETC;
}
