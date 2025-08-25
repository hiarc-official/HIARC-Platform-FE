import { cookies } from 'next/headers';
import { HeaderClient } from './header-client';

export default function ServerHeader(): React.ReactElement {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  const authCookie = cookieStore.get('access');
  const isAuthenticated = !!authCookie?.value;

  console.log('ServerHeader - All cookies:', allCookies);
  console.log('ServerHeader - authCookie:', authCookie);
  console.log('ServerHeader - isAuthenticated:', isAuthenticated);

  return <HeaderClient isAuthenticated={isAuthenticated} />;
}
