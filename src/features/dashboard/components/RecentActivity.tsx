'use client';

import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';

export const RecentActivity = () => {
  const { data: me } = useMeQuery();
  const { data, isLoading, isError } = useDashboardQuery(me?.id);

  if (isLoading) return <div>대시보드 로딩중...</div>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

  const recentEnrollments =
    data
      ?.sort(
        (a, b) =>
          new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
      )
      .slice(0, 5) ?? [];

  return (
    <div className="lg:col-span-2">
      <section className="curriculum bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          최근 활동
        </h2>
        <ul className="space-y-6">
          {recentEnrollments.length > 0 ? (
            recentEnrollments.map((e) => (
              <li
                key={e.id}
                className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
              >
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {e.status === 'completed'
                    ? `✅ 수강 완료 - ${e.course.title}`
                    : `📘 수강 시작 - ${e.course.title}`}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {!e.completedAt
                    ? `• 수강 시작: ${e.enrolledAt}`
                    : `• 수강 완료: ${e.completedAt}`}
                </span>
              </li>
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[400px] bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                최근 활동 내역이 없습니다.
              </p>
            </div>
          )}
        </ul>
      </section>
    </div>
  );
};
