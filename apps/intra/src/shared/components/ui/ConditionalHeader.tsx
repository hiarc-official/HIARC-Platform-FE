import { ServerCookieUtil } from '@/shared/utils/server-cookie-util';
import { ConditionalHeaderClient } from './ConditionalHeaderClient';

export default async function ConditionalHeader(): Promise<React.ReactElement> {
  const { isAuthenticated } = await ServerCookieUtil.checkAuth();
  
  return <ConditionalHeaderClient isAuthenticated={isAuthenticated} />;
}