// 자동 생성된 아이콘팩 — shared-assets SVG 를 인라인 React 컴포넌트로 변환.
// (파일 fetch 없이 렌더되므로 Storybook 등 정적 환경에서도 깨지지 않는다)
import * as React from 'react';
import { ArrowLeftIcon } from './ArrowLeftIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { ArrowUpIcon } from './ArrowUpIcon';
import { BasicIcon } from './BasicIcon';
import { BronzeMedalIcon } from './BronzeMedalIcon';
import { CameraIcon } from './CameraIcon';
import { CaretDownIcon } from './CaretDownIcon';
import { CaretUpIcon } from './CaretUpIcon';
import { CheckIcon } from './CheckIcon';
import { CheckboxIcon } from './CheckboxIcon';
import { CheckboxPrimaryIcon } from './CheckboxPrimaryIcon';
import { CloseIcon } from './CloseIcon';
import { DeleteIcon } from './DeleteIcon';
import { DeleteButtonIcon } from './DeleteButtonIcon';
import { DownIcon } from './DownIcon';
import { EditIcon } from './EditIcon';
import { ErrorIcon } from './ErrorIcon';
import { ExpertIcon } from './ExpertIcon';
import { GoldMedalIcon } from './GoldMedalIcon';
import { GoogleLoginIcon } from './GoogleLoginIcon';
import { HamburgerIcon } from './HamburgerIcon';
import { HomeIcon } from './HomeIcon';
import { InstagramIcon } from './InstagramIcon';
import { IntermediateIcon } from './IntermediateIcon';
import { LeftIcon } from './LeftIcon';
import { LinkIcon } from './LinkIcon';
import { LogoIcon } from './LogoIcon';
import { MailIcon } from './MailIcon';
import { MessageIcon } from './MessageIcon';
import { MoreIcon } from './MoreIcon';
import { OpenIcon } from './OpenIcon';
import { PeopleIcon } from './PeopleIcon';
import { PlusButtonIcon } from './PlusButtonIcon';
import { RightIcon } from './RightIcon';
import { ScheduleIcon } from './ScheduleIcon';
import { SilverMedalIcon } from './SilverMedalIcon';
import { UserIcon } from './UserIcon';
import { ZoomInIcon } from './ZoomInIcon';

export { ArrowLeftIcon } from './ArrowLeftIcon';
export { ArrowRightIcon } from './ArrowRightIcon';
export { ArrowUpIcon } from './ArrowUpIcon';
export { BasicIcon } from './BasicIcon';
export { BronzeMedalIcon } from './BronzeMedalIcon';
export { CameraIcon } from './CameraIcon';
export { CaretDownIcon } from './CaretDownIcon';
export { CaretUpIcon } from './CaretUpIcon';
export { CheckIcon } from './CheckIcon';
export { CheckboxIcon } from './CheckboxIcon';
export { CheckboxPrimaryIcon } from './CheckboxPrimaryIcon';
export { CloseIcon } from './CloseIcon';
export { DeleteIcon } from './DeleteIcon';
export { DeleteButtonIcon } from './DeleteButtonIcon';
export { DownIcon } from './DownIcon';
export { EditIcon } from './EditIcon';
export { ErrorIcon } from './ErrorIcon';
export { ExpertIcon } from './ExpertIcon';
export { GoldMedalIcon } from './GoldMedalIcon';
export { GoogleLoginIcon } from './GoogleLoginIcon';
export { HamburgerIcon } from './HamburgerIcon';
export { HomeIcon } from './HomeIcon';
export { InstagramIcon } from './InstagramIcon';
export { IntermediateIcon } from './IntermediateIcon';
export { LeftIcon } from './LeftIcon';
export { LinkIcon } from './LinkIcon';
export { LogoIcon } from './LogoIcon';
export { MailIcon } from './MailIcon';
export { MessageIcon } from './MessageIcon';
export { MoreIcon } from './MoreIcon';
export { OpenIcon } from './OpenIcon';
export { PeopleIcon } from './PeopleIcon';
export { PlusButtonIcon } from './PlusButtonIcon';
export { RightIcon } from './RightIcon';
export { ScheduleIcon } from './ScheduleIcon';
export { SilverMedalIcon } from './SilverMedalIcon';
export { UserIcon } from './UserIcon';
export { ZoomInIcon } from './ZoomInIcon';

export const ICONS = {
  'ArrowLeft': ArrowLeftIcon,
  'ArrowRight': ArrowRightIcon,
  'ArrowUp': ArrowUpIcon,
  'Basic': BasicIcon,
  'BronzeMedal': BronzeMedalIcon,
  'Camera': CameraIcon,
  'CaretDown': CaretDownIcon,
  'CaretUp': CaretUpIcon,
  'Check': CheckIcon,
  'Checkbox': CheckboxIcon,
  'CheckboxPrimary': CheckboxPrimaryIcon,
  'Close': CloseIcon,
  'Delete': DeleteIcon,
  'DeleteButton': DeleteButtonIcon,
  'Down': DownIcon,
  'Edit': EditIcon,
  'Error': ErrorIcon,
  'Expert': ExpertIcon,
  'GoldMedal': GoldMedalIcon,
  'GoogleLogin': GoogleLoginIcon,
  'Hamburger': HamburgerIcon,
  'Home': HomeIcon,
  'Instagram': InstagramIcon,
  'Intermediate': IntermediateIcon,
  'Left': LeftIcon,
  'Link': LinkIcon,
  'Logo': LogoIcon,
  'Mail': MailIcon,
  'Message': MessageIcon,
  'More': MoreIcon,
  'Open': OpenIcon,
  'People': PeopleIcon,
  'PlusButton': PlusButtonIcon,
  'Right': RightIcon,
  'Schedule': ScheduleIcon,
  'SilverMedal': SilverMedalIcon,
  'User': UserIcon,
  'ZoomIn': ZoomInIcon,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  ...props
}: { name: IconName } & React.SVGProps<SVGSVGElement>): React.ReactElement {
  const Cmp = ICONS[name];
  return <Cmp {...props} />;
}
