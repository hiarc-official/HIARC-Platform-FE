import { PageLayout, Title, Card } from '@hiarc-platform/design-system';
import InfoEntity from '../atoms/InfoEntity';
import { DinamicStreakBox } from '../block/streak/DinamicStreakBox';
import StreakInformation from '../block/streak/StreakInformation';

const exampleData = [
  { date: '2025-01-01', count: 1 },
  { date: '2025-01-02', count: 1 },
  { date: '2025-01-03', count: 2 },
  { date: '2025-01-04', count: 0 },
  { date: '2025-01-05', count: 3 },
  { date: '2025-01-06', count: 0 },
  { date: '2025-01-07', count: 1 },
  { date: '2025-01-08', count: 2 },
  { date: '2025-01-09', count: 1 },
  { date: '2025-01-10', count: 0 },
  { date: '2025-01-11', count: 4 },
  { date: '2025-01-12', count: 3 },
  { date: '2025-01-13', count: 2 },
  { date: '2025-01-14', count: 0 },
  { date: '2025-01-15', count: 1 },
  { date: '2025-01-16', count: 1 },
  { date: '2025-01-17', count: 2 },
  { date: '2025-01-18', count: 2 },
  { date: '2025-01-19', count: 1 },
  { date: '2025-01-20', count: 0 },
  { date: '2025-01-21', count: 3 },
  { date: '2025-01-22', count: 1 },
  { date: '2025-01-23', count: 0 },
  { date: '2025-01-24', count: 2 },
  { date: '2025-01-25', count: 1 },
  { date: '2025-01-26', count: 2 },
  { date: '2025-01-27', count: 0 },
  { date: '2025-01-28', count: 1 },
  { date: '2025-01-29', count: 2 },
  { date: '2025-01-30', count: 2 },
  { date: '2025-01-31', count: 1 },
  // ... 생략된 부분 ...
  { date: '2025-04-30', count: 1 },
  { date: '2025-05-01', count: 3 },
  { date: '2025-05-02', count: 2 },
  { date: '2025-05-03', count: 1 },
];

const TestPage = () => (
  <PageLayout containerClassName="flex-col items-stretch justify-start">
    <div className="flex w-full flex-col gap-8">
      <Title size="sm" weight="bold">
        Streak Preview
      </Title>
      <Card className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-none">
        <div className="flex w-full flex-col">
          <InfoEntity handle="ghwo336" div={1} tier={13} />
          <div className="ml-3 mt-[-1px] w-[98%] border-b border-gray-200"></div>
        </div>
        <div className="mt-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <DinamicStreakBox data={exampleData} />
        </div>
        <StreakInformation currentTotalStreak={42} currentSeasonStreak={7} />
      </Card>
    </div>
  </PageLayout>
);

export default TestPage;
