'use client';

import Link from 'next/link';

const DashboardCoursesPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ease-in-out"
        >
          &larr; 대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default DashboardCoursesPage;
