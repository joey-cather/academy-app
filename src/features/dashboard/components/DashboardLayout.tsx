import { ReactNode, useEffect, useRef, useState } from 'react';
import { useMeQuery } from '../../auth/api/useMeQuery';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: me, isLoading, isError } = useMeQuery();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  if (isLoading) return <p className="text-center mt-8">로딩 중...</p>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

  if (!me) return <div>로그인이 필요합니다.</div>;

  return (
    <div className="bg-white dark:bg-black">
      <div className="w-full min-w-md md:min-w-2xl lg:min-w-5xl flex flex-col">
        <header className="bg-white dark:bg-black px-4 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
              {me.name}님, 환영합니다!
            </h1>

            <div ref={dropdownRef} className="relative inline-block">
              {/* 메인 버튼 */}
              <button
                onClick={() => setOpen(!open)}
                className={`inline-flex w-auto items-center justify-between rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors duration-200 dark:bg-zinc-700 dark:text-zinc-200 ${open ? 'bg-zinc-200 shadow-md dark:bg-zinc-600' : 'hover:bg-zinc-200 dark:hover:bg-zinc-600'}`}
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
                  className="block px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-600"
                  onClick={() => setOpen(false)}
                >
                  📊 대시보드
                </Link>
                <Link
                  href="/dashboard/courses"
                  className="block px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-600"
                  onClick={() => setOpen(false)}
                >
                  📚 수강 관리
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-600"
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
