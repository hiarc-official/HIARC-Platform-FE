import { ServerCookieUtil } from '@/shared/utils/server-cookie-util';
import { ConditionalHeaderClient } from './ConditionalHeaderClient';

export default function ConditionalHeader(): React.ReactElement {
  const { isAuthenticated } = ServerCookieUtil.checkAuth();
  
  return <ConditionalHeaderClient isAuthenticated={isAuthenticated} />;
}