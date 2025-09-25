import { LoadingDots } from '@hiarc-platform/ui';

export default function Loading(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingDots size="lg" />
    </div>
  );
}