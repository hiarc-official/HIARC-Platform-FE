import { Label, PageLayout, Title } from '@hiarc-platform/design-system';
import BackButton from '../components/BackButton';

const SearchPage = () => (
  <PageLayout containerClassName="flex-col items-stretch justify-start">
    <div className="flex w-full flex-col gap-8">
      <BackButton />
      <div>
        <Title size="sm" weight="bold">
          검색
        </Title>
        <Label size="sm" className="mt-1 block text-gray-600">
          핸들 검색으로 스트릭 · 레이팅 조회
        </Label>
      </div>

      <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-none">
        <Label size="lg" weight="bold">
          준비중입니다
        </Label>
        <Label size="sm" className="text-gray-600">
          잠시만 기다려주세요
        </Label>
      </div>
    </div>
  </PageLayout>
);

export default SearchPage;
