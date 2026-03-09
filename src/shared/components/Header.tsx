'use client';
import Link from 'next/link';
import { useAuthStore } from '../hooks/useAuthStore';
import { useLogoutMutation } from '@/src/features/auth/api/useLogoutMutation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { queryClient } from '@/src/shared/api/queryClient';
import { useNotification } from '../providers/NotificationProvider';

const Header = () => {
  const { accessToken } = useAuthStore();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const { mutateAsync: logout } = useLogoutMutation();

  const router = useRouter();

  const { notify } = useNotification();

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initial =
      (stored as 'light' | 'dark' | null) ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const handleToggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  }, [theme]);

  const handleClickDashboard = useCallback(() => {
    if (!accessToken) {
      notify({
        type: 'alert',
        message: '먼저 로그인해 주세요.',
        onConfirm: () => {
          router.push('/login');
        },
      });
    } else {
      router.push('/dashboard');
    }
  }, [accessToken, notify, router]);

  const handleClickLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.success) {
        useAuthStore.getState().setAccessToken(null);
        queryClient.invalidateQueries({ queryKey: ['me'] });
        router.replace('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        notify({
          type: 'alert',
          message: error.message,
        });
      }
    }
  }, [logout]);

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white ring-1 ring-zinc-300 dark:ring-zinc-700">
              A
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-200">
            <Link
              href="/courses"
              className="hover:text-zinc-900 hover:scale-105 dark:hover:text-white"
            >
              강좌보기
            </Link>
            <Link
              href="/instructors"
              className="hover:text-zinc-900 hover:scale-105 dark:hover:text-white"
            >
              강사보기
            </Link>
            <button
              onClick={handleClickDashboard}
              className="hover:text-zinc-900 hover:scale-105 cursor-pointer dark:hover:text-white"
            >
              대시보드
            </button>
            <Link
              href="/contact"
              className="hover:text-zinc-900 hover:scale-105 dark:hover:text-white"
            >
              문의하기
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            className="rounded-full border border-zinc-300 p-2 text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {theme === 'dark' ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m4.93 19.07 1.41-1.41" />
                <path d="m17.66 6.34 1.41-1.41" />
              </svg>
            )}
            <span className="sr-only">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
          {accessToken ? (
            <button
              onClick={handleClickLogout}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
