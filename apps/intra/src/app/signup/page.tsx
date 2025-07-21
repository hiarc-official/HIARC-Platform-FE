'use client';

import ToggleSelector from '@/ui/ToggleSelector';

export default function SignUpPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ToggleSelector required={true} type="학년" placeholder="학년을 입력해주세요" />
        <ToggleSelector type="학과" placeholder="학과을 입력해주세요" required={true} />
      </div>
    </main>
  );
}
