import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppLayout } from '../shared/layouts/AppLayout';
import ReactQueryProvider from '../shared/providers/ReactQueryProvider';
import { MSWComponent } from '../mocks/MSWComponent';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '아카데미 앱 | 온라인 학습 플랫폼',
  description:
    '온라인으로 강의를 수강하고, 학습 진도를 관리할 수 있는 아카데미 플랫폼입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko-KR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-zinc-50 text-zinc-900`}
      >
        <MSWComponent />
        <ReactQueryProvider>
          <AppLayout>{children}</AppLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
