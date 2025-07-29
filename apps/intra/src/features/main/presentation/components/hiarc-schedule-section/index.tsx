import { Divider, Title } from '@hiarc-platform/ui';
import CalendarBar from './calendar-bar';
import { ScheduleListItem } from './schedule-list-item';

export function HiarcScheduleSection(): React.ReactElement {
  const calendarData = [
    {
      date: '2025-07-28',
      categories: ['rating', 'study'],
    },
    {
      date: '2025-07-29',
      categories: ['rating', 'study', 'general', 'etc', 'external'],
    },
  ];

  return (
    <section className="w-full">
      <Title size="sm" weight="bold" className="mb-2">
        학회일정
      </Title>
      <Divider variant="horizontal" size="full" className="mt-4" />
      <CalendarBar data={calendarData} daysToShow={7} className="mb-7 mt-4" />
      <div className="flex flex-col gap-2">
        <ScheduleListItem title={'하이팅 : 2배 이벤트'} category={'rating'} />
        <ScheduleListItem title={'[초급] 스터디 제목 : 5회차 T502 16-18  '} category={'study'} />
        <ScheduleListItem title={'한강 나들이'} category={'general'} />
      </div>
    </section>
  );
}
