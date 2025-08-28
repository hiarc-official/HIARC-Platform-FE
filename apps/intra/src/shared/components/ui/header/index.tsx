import { ServerCookieUtil } from '@/shared/utils/server-cookie-util';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

export default function Header(): React.ReactElement {
  const { isAuthenticated } = ServerCookieUtil.checkAuth();

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4">
        <MobileHeader isAuthenticated={isAuthenticated} />
        <DesktopHeader isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
