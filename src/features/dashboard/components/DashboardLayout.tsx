import { ReactNode, useState } from 'react';
import { useMeQuery } from '../../auth/api/useMeQuery';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: me, isLoading, isError } = useMeQuery();

  if (isLoading) return <p className="text-center mt-8">로딩 중...</p>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

  if (!me) return <div>로그인이 필요합니다.</div>;

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-black">
      <div className="w-full min-w-md md:min-w-2xl lg:min-w-5xl flex flex-col">
        <header className="bg-white dark:bg-black shadow-md px-4 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {me.name}님, 환영합니다!
            </h1>

            <div className="relative inline-block">
              {/* 메인 버튼 */}
              <button
                onClick={() => setOpen(!open)}
                className={`w-auto text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-zinc-700 rounded-lg px-4 py-2 inline-flex justify-between items-center transition-all duration-200 ease-in-out ${open ? 'bg-gray-200 dark:bg-zinc-600 shadow-md scale-105' : 'hover:bg-gray-200 dark:hover:bg-zinc-600'}`}
              >
                대시보드 {open ? '▲' : '▼'}
              </button>

              {/* 드롭다운 메뉴 */}
              <div
                className={`absolute left-0 lg:left-auto lg:right-0 mt-2 w-32 bg-white dark:bg-zinc-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ transitionProperty: 'max-height, opacity' }}
              >
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-600"
                  onClick={() => setOpen(false)}
                >
                  📊 대시보드
                </Link>
                <Link
                  href="/dashboard/courses"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-600"
                  onClick={() => setOpen(false)}
                >
                  📚 수강 관리
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-600"
                  onClick={() => setOpen(false)}
                >
                  👤 마이페이지
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
