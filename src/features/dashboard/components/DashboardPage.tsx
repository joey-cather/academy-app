'use client';

import { ProgressSummary } from './ProgressSummary';
import { ActiveCourses } from './ActiveCourses';
import { RecentActivity } from './RecentActivity';
import { useAuthStore } from '@/src/shared/hooks/useAuthStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/src/shared/layouts/NotificationProvider';
import DashboardLayout from './DashboardLayout';

const DashboardPage = () => {
  const { accessToken } = useAuthStore();

  const router = useRouter();

  const { notify } = useNotification();

  useEffect(() => {
    if (!accessToken) {
      notify({
        type: 'alert',
        message: '먼저 로그인해 주세요.',
        onConfirm: () => {
          router.push('/login');
        },
      });
    }
  }, [accessToken]);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* 환영 메시지 및 진도 요약 */}
        <ProgressSummary />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 수강 중인 강좌 */}
          <ActiveCourses />

          {/* 최근 활동 */}
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
