import { cn, DialogUtil, IconButton, Label, RatingChip, Title } from '@hiarc-platform/ui';
import React from 'react';
import { MyInfoDialog } from './my-info-dialog';
import { MemberProfile } from '../../types/model/member-profile';
import { useAuthStore } from '@/shared/store/auth-store';

interface MyInfoSectionProps {
  className?: string;
  isMe?: boolean;
  memberProfileData?: MemberProfile;
  onSave?(introduction: string): Promise<void>;
}

export function MyInfoSection({
  className,
  onSave,
  isMe,
  memberProfileData,
}: MyInfoSectionProps): React.ReactElement {
  const { user } = useAuthStore();

  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <MyInfoDialog
        initialValue={memberProfileData?.introduction || ''}
        onSave={onSave}
        onCancel={() => {
          console.log('My info dialog cancelled');
        }}
      />
    );
  };

  const handleBojHandleClick = (): void => {
    if (memberProfileData?.bojHandle) {
      window.open(`https://solved.ac/profile/${memberProfileData?.bojHandle}`, '_blank');
    }
  };

  return (
    <div className={cn('flex w-full flex-col gap-4 ', className)}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center gap-2">
            <Title
              size="sm"
              weight="bold"
              disableAnimation={true}
              className="cursor-pointer"
              onClick={handleBojHandleClick}
            >
              {memberProfileData?.bojHandle}
            </Title>
            <Title size="sm" weight="semibold" disableAnimation={true} className="text-gray-500">
              ({memberProfileData?.name})
            </Title>
            <RatingChip rating={memberProfileData?.tier ?? 'UNRATED'} />
            {isMe && user?.memberRole === 'ASSOCIATE' ? null : (
              <RatingChip rating={memberProfileData?.division ?? 'UNRATED'} />
            )}
          </div>
          {isMe && (
            <IconButton
              type="button"
              iconSrc="/shared-assets/Edit.svg"
              onClick={handleOpenDialog}
            />
          )}
        </div>
        <Label className={cn(!memberProfileData?.introduction ? 'text-gray-500' : 'text-gray-900')}>
          {memberProfileData?.introduction ?? '자기소개가 없습니다.'}
        </Label>
      </div>
    </div>
  );
}
