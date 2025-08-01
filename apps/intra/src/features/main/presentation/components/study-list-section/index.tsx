import { StudyCard, Title } from '@hiarc-platform/ui';

export function StudyListSection(): React.ReactElement {
  return (
    <div className="flex w-full flex-col gap-8 pt-8">
      <section className="">
        <Title size="sm" weight="bold" className="mb-2">
          스터디목록
        </Title>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StudyCard
            time="화,금 (8시)"
            delivery="대면"
            studyLevel="basic"
            studyTitle="초급스터디"
            hostName="이가은"
            startDate="2025.03.25"
            endDate="2025.06.20"
            studyDescription="스터디 설명"
            state="participating"
          />
          <StudyCard
            time="화,금 (8시)"
            delivery="대면"
            studyLevel="intermediate"
            studyTitle="초급스터디"
            hostName="이태경"
            startDate="2025.03.25"
            endDate="2025.06.20"
            studyDescription="스터디 설명"
            state="recruiting"
          />
          <StudyCard
            time="화,금 (8시)"
            delivery="비대면"
            studyLevel="expert"
            studyTitle="초급스터디"
            hostName="송한서"
            startDate="2025.03.25"
            endDate="2025.06.20"
            studyDescription="스터디 설명"
            state="participating"
          />
        </div>
      </section>
    </div>
  );
}
