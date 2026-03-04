'use client';

import Link from 'next/link';
import { ProgressSummary } from './ProgressSummary';
import { ActiveCourses } from './ActiveCourses';
import { RecentActivity } from './RecentActivity';

const DashboardPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* 네비게이션 링크 */}
      <div className="mb-6 flex space-x-4">
        <Link
          href="/dashboard/courses"
          className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
        >
          📚 수강 관리
        </Link>
        <Link
          href="/dashboard/profile"
          className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
        >
          👤 프로필 수정
        </Link>
      </div>

      {/* 환영 메시지 및 진도 요약 */}
      <ProgressSummary />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 수강 중인 강좌 */}
        <ActiveCourses />

        {/* 최근 활동 */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;
