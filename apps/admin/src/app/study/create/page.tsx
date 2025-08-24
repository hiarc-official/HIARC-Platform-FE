import { DesktopStudyCreatePage, MobileStudyCreatePage } from '@/features/study/pages/study-create-page';

export default function CreateStudyPage(): React.ReactElement {
  return (
    <>
      <div className="hidden md:block">
        <DesktopStudyCreatePage />
      </div>
      <div className="block md:hidden">
        <MobileStudyCreatePage />
      </div>
    </>
  );
}
