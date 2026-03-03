'use client';

import Link from 'next/link';

const DashboardPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
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
    </div>
  );
};

export default DashboardPage;
