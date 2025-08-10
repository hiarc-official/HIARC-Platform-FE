import { Button, Label, PageLayout, Title } from '@hiarc-platform/ui';
import AddStaffTriggerButton from '@/features/staff/components/add-staff-trigger-button';

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
      </div>
    </PageLayout>
  );
}
