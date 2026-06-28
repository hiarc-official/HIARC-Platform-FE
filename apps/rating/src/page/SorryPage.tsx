import { Label, PageLayout, Title } from '@hiarc-platform/design-system';

export const SorryPage = () => (
  <PageLayout containerClassName="flex-col items-stretch justify-start">
    <div className="flex w-full flex-col gap-8">
      <div>
        <Title size="sm" weight="bold">
          하이팅 서비스 점검중입니다
        </Title>
        <Label size="sm" className="mt-1 block text-gray-600">
          다음학기에 다시 찾아와주세요!
        </Label>
      </div>
    </div>
  </PageLayout>
);
