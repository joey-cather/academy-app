'use client';
import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { useMeQuery } from '@/src/features/auth/api/useMeQuery';

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  useMeQuery();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
