import LectureCard from '@/ui/lecture/LectureCard';
import SmallLectureCard from '@/ui/lecture/SmallLectureCard';
import { CategoryChip } from '@hiarc-platform/ui';
import StudyCard from '@/ui/studyCard/StudyCard';
import SmallStudyCard from '@/ui/studyCard/SmallStudyCard';
import { Level } from 'constants/level';

export default function StudyPage(): React.ReactElement {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9 pb-10 ">
      <div>
        <LectureCard week={1} study={'그래프 이론'} classRoom="T502" />
        <LectureCard week={2} study={'다이나믹 프로그래밍'} classRoom="T602" isAdmin={true} />
        <LectureCard week={3} study={'그리디 알고리즘'} classRoom="T702" />
      </div>
      <SmallLectureCard week={1} study={'그래프 이론'} classRoom="T503" />
      <CategoryChip category="participating" />
      <CategoryChip category="recruiting" />
      <StudyCard
        time="화,금 (8시)"
        delivery="대면"
        studyLevel={Level.BASIC}
        studyTitle="초급스터디"
        hostName="이가은"
        startDate="2025.03.25"
        endDate="2025.06.20"
        studyDiscription="스터디 설명"
        state="participating"
      />
      <StudyCard
        time="화,금 (8시)"
        delivery="대면"
        studyLevel={Level.INTERMEDIATE}
        studyTitle="초급스터디"
        hostName="이태경"
        startDate="2025.03.25"
        endDate="2025.06.20"
        studyDiscription="스터디 설명"
        state="recruiting"
      />
      <StudyCard
        time="화,금 (8시)"
        delivery="비대면"
        studyLevel={Level.EXPERT}
        studyTitle="초급스터디"
        hostName="송한서"
        startDate="2025.03.25"
        endDate="2025.06.20"
        studyDiscription="스터디 설명"
        state="participating"
      />

      <SmallStudyCard
        time="화,금 (8시)"
        delivery="대면"
        studyLevel={Level.BASIC}
        studyTitle="초급스터디"
        hostName="이가은"
        startDate="2025.03.25"
        endDate="2025.06.20"
        studyDiscription="스터디 설명"
        state="participating"
      />
      <SmallStudyCard
        time="화,금 (8시)"
        delivery="대면"
        studyLevel={Level.INTERMEDIATE}
        studyTitle="초급스터디"
        hostName="이태경"
        startDate="2025.03.25"
        endDate="2025.06.20"
        studyDiscription="스터디 설명"
        state="recruiting"
      />
      <SmallStudyCard
        time="화,금 (8시)"
        delivery="비대면"
        studyLevel={Level.EXPERT}
        studyTitle="초급스터디"
        hostName="송한서"
        startDate="2025.03.25"
        endDate="2025.06.20"
        studyDiscription="스터디 설명"
        state="participating"
      />
    </div>
  );
}
