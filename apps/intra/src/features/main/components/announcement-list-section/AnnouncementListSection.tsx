'use client';

import { cn, Divider, SlideFade, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { AnnouncementListItem } from './AnnouncementListItem';
import { RatingListItem } from './RatingListItem';
import { useRouter } from 'next/navigation';
import { useUpcomingSchedule } from '../../hooks/use-upcoming-schedule';
import { useExternalSchedule } from '../../hooks/use-external-schedule';
import { Schedule } from '../../types/model/schedule';
import { DateUtil } from '@hiarc-platform/shared';

interface AnnouncementListSectionProps {
  className?: string;
}

export function AnnouncementListSection({
  className,
}: AnnouncementListSectionProps): React.ReactElement {
  const tabItems = [
    { label: '다가오는 소식', value: 'announcement' },
    { label: '외부 소식', value: 'algorithm-news' },
  ];
  const [tab, setTab] = useState('announcement');
  const router = useRouter();
  const { data: upcomingSchedule } = useUpcomingSchedule();
  const { data: externalAnnouncements } = useExternalSchedule();

  // Rating 데이터 사용
  const ratingData = upcomingSchedule?.rating;
  const regularSchedules = upcomingSchedule?.schedules || [];

  return (
    <section className={cn('w-full', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} />
        <button
          className="rounded-md px-3 hover:bg-gray-50"
          onClick={() => {
            router.push('/announcement');
          }}
        >
          {'더보기 ->'}
        </button>
      </div>

      <Divider variant="horizontal" size="full" className="mt-4" />

      {tab === 'announcement' ? (
        <div className="flex h-[350px] flex-col">
          {/* Rating 고정 영역 */}
          {ratingData && (
            <div className="flex-shrink-0">
              <SlideFade key="rating-section">
                <div>
                  {ratingData.season.title && (
                    <RatingListItem
                      key="rating-season"
                      title={`${ratingData.season.title} : ${DateUtil.formatKoreanDate(ratingData.season.startDateTime)} ~ ${DateUtil.formatKoreanDate(ratingData.season.endDateTime)}`}
                      category="RATING"
                    />
                  )}
                  {ratingData.event.title && (
                    <RatingListItem
                      key="rating-event"
                      title={`${ratingData.event.title} : ${DateUtil.formatKoreanDate(ratingData.event.startDateTime)} ~ ${DateUtil.formatKoreanDate(ratingData.event.endDateTime)}`}
                      category="RATING"
                    />
                  )}
                </div>
              </SlideFade>
            </div>
          )}

          {/* 일반 스케줄 스크롤 영역 */}
          {regularSchedules.length > 0 && (
            <div className="overflow-y-auto">
              <SlideFade key="regular-schedules">
                <div>
                  {regularSchedules.map((announcement: Schedule, index: number) => (
                    <AnnouncementListItem
                      key={announcement.announcementId || index}
                      announcementId={announcement.announcementId || 0}
                      title={announcement.scheduleTitle || '제목 없음'}
                      date={
                        announcement.scheduledAt
                          ? new Date(announcement.scheduledAt).toLocaleDateString()
                          : new Date(announcement.createdAt ?? '').toLocaleDateString()
                      }
                      category={announcement.announcementType || 'GENERAL'}
                    />
                  ))}
                </div>
              </SlideFade>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[350px] overflow-y-auto">
          <SlideFade key="algorithm-news">
            <div>
              {externalAnnouncements &&
                externalAnnouncements.map((announcement: Schedule, index: number) => (
                  <AnnouncementListItem
                    key={announcement.announcementId || index}
                    announcementId={announcement.announcementId || 0}
                    title={announcement.scheduleTitle || '제목 없음'}
                    date={
                      announcement.createdAt
                        ? new Date(announcement.createdAt).toLocaleDateString()
                        : ''
                    }
                    category={announcement.announcementType || 'GENERAL'}
                  />
                ))}
            </div>
          </SlideFade>
        </div>
      )}
    </section>
  );
}
