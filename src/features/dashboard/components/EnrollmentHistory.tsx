'use client';

import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';

const EnrollmentHistory = () => {
  const { data: me } = useMeQuery();

  const { data, isLoading, isError } = useDashboardQuery(me?.id);

  if (isLoading) return <div>대시보드 로딩중...</div>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

  const sortedEnrollments =
    data?.sort(
      (a, b) =>
        new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
    ) ?? [];

  return (
    <section className="courses-section flex-[3] bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">수강 이력</h2>
      <ul className="space-y-5">
        {sortedEnrollments.length > 0 ? (
          sortedEnrollments.map((e) => (
            <li
              key={e.id}
              className="bg-zinc-100 dark:bg-zinc-700 p-5 rounded-2xl shadow-md"
            >
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {e.status === 'completed'
                  ? `✅ 수강 완료 - ${e.course.title}`
                  : e.status === 'active'
                    ? `📘 수강 중 - ${e.course.title}`
                    : `❌ 취소 - ${e.course.title}`}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                {`• 수강 시작: ${e.enrolledAt}`}
                {e.completedAt && ` / • 수강 완료: ${e.completedAt}`}
              </span>
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-inner">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              최근 활동 내역이 없습니다.
            </p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default EnrollmentHistory;
