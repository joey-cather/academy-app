'use client';

import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';

export const ProgressSummary = () => {
  const { data: me } = useMeQuery();
  const { data, isLoading, isError } = useDashboardQuery(me?.id);

  if (isLoading) return <div>대시보드 로딩중...</div>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

  const total = data?.length ?? 0;
  const completed = data?.filter((e) => e.status === 'completed').length ?? 0;
  const active = data?.filter((e) => e.status === 'active').length ?? 0;
  const avg = (data?.reduce((a, c) => a + c.progress, 0) ?? 0) / total;

  return (
    <section className="bg-zinc-50 dark:bg-zinc-800 p-6 shadow-xl rounded-2xl mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        진도 요약
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">총 강좌</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {total}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">진행 중</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {active}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">완료</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {completed}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            평균 진도율
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {avg != null && !isNaN(avg) && isFinite(avg) ? Math.round(avg) : 0}%
          </p>
        </div>
      </div>
    </section>
  );
};
