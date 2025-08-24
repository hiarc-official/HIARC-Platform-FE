import { DesktopLoginPage, MobileLoginPage } from '@/features/auth/pages/login-page';

export default function LoginPage(): React.ReactElement {
  return (
    <>
      <div className="hidden md:block">
        <DesktopLoginPage />
      </div>
      <div className="block md:hidden">
        <MobileLoginPage />
      </div>
    </>
  );
}
