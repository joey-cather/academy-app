'use client';

import { useAuthStore } from '@/src/shared/hooks/useAuthStore';
import { useNotification } from '@/src/shared/layouts/NotificationProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import SearchBar from './SearchBar';
import DashboardCoursesList from './DashboardCoursesList';

const DashboardCoursesPage = () => {
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
      <div className="w-5xl mx-auto px-4 py-6">
        {/* 검색/필터 바 */}
        <SearchBar />

        {/* 강좌 목록 */}
        <DashboardCoursesList />
      </div>
    </DashboardLayout>
  );
};

export default DashboardCoursesPage;
