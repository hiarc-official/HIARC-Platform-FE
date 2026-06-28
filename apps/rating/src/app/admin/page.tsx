'use client';

import { AdminGuard } from '@/guards/AdminGuard';
import AdminPage from '@/page/AdminPage';

export default function Page(): React.ReactElement {
  return (
    <AdminGuard>
      <AdminPage />
    </AdminGuard>
  );
}
