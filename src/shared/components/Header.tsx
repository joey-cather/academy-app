'use client';
import Link from 'next/link';
import { useAuthStore } from '../hooks/useAuthStore';
import { useLogoutMutation } from '@/src/features/auth/api/useLogoutMutation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import axios from 'axios';
import { queryClient } from '@/src/shared/api/queryClient';

export function Header() {
  const { accessToken } = useAuthStore();

  const { mutateAsync: logout } = useLogoutMutation();

  const router = useRouter();

  const handleClickDashboard = useCallback(() => {
    if (!accessToken) {
      alert('먼저 로그인해 주세요.');
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [accessToken, router]);

  const handleClickLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.success) {
        useAuthStore.getState().setAccessToken(null);
        queryClient.invalidateQueries({ queryKey: ['me'] });
        router.replace('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, [logout]);

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
              A
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-700">
            <Link href="/courses" className="hover:text-zinc-900">
              강좌보기
            </Link>
            <Link href="/instructors" className="hover:text-zinc-900">
              강사보기
            </Link>
            <button
              onClick={handleClickDashboard}
              className="hover:text-zinc-900"
            >
              대시보드
            </button>
            <Link href="/contact" className="hover:text-zinc-900">
              문의하기
            </Link>
          </nav>
        </div>
        <div>
          {accessToken ? (
            <button
              onClick={handleClickLogout}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-100"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
