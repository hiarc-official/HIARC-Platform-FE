import { Label, PageLayout, Title } from '@hiarc-platform/ui';
import AddStaffTriggerButton from '@/features/staff/components/add-staff-trigger-button';
import { StaffTable } from '@/features/staff/components/staff-table';
import { StudyLeaderTable } from '@/features/staff/components/study-leader-table';

export default function StaffPage(): React.ReactElement {
  return (
    <PageLayout>
      <div className=" flex min-h-screen w-full flex-col gap-6 py-4 ">
        <Title size="sm" weight="bold">
          운영진/스터디장 관리
        </Title>
        <div className="flex w-full items-center justify-between">
          <Label size="lg" weight="bold">
            운영진
          </Label>
          <AddStaffTriggerButton />
        </div>
        <StaffTable staffData={[]} />
        <div className="flex w-full items-center ">
          <Label size="lg" weight="bold">
            스터디장
          </Label>
        </div>
        <StudyLeaderTable studyLeaderData={[]} />
      </div>
    </PageLayout>
  );
}
