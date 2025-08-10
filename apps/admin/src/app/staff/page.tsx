import { PageLayout, Title } from '@hiarc-platform/ui';

export default function StaffPage(): React.ReactElement {
  return (
    <PageLayout>
      <div className=" flex w-full flex-col gap-6 py-4 ">
        <Title size="sm" weight="bold">
          운영진/스터디장 관리
        </Title>
      </div>
    </PageLayout>
  );
}
