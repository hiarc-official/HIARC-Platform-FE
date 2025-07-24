import LectureCard from '@/ui/lecture/LectureCard';
import SmallLectureCard from '@/ui/lecture/SmallLectureCard';
export default function StudyPage(): React.ReactElement {
  return (
    <div className="flex h-[700px] w-full flex-col items-center justify-center gap-9">
      <div>
        <LectureCard week={1} study={'그래프 이론'} classRoom="T502" />
        <LectureCard week={2} study={'다이나믹 프로그래밍'} classRoom="T602" isAdmin={true} />
        <LectureCard week={3} study={'그리디 알고리즘'} classRoom="T702" />
      </div>
      <SmallLectureCard week={1} study={'그래프 이론'} classRoom="T503" />
    </div>
  );
}
