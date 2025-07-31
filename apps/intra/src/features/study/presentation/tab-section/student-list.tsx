import { StudentListItem } from '@hiarc-platform/ui';

export function StudentList(): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      <StudentListItem name={'123'} />
      <StudentListItem name={'123'} />
      <StudentListItem name={'123'} />
      <StudentListItem name={'123'} />
    </div>
  );
}
