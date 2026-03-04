'use client';

import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';
import CircularProgressBar from './CircularProgressBar';

export const ActiveCourses = () => {
  const { data: me, isLoading: meLoading } = useMeQuery();
  const { data, isLoading } = useDashboardQuery(me?.id);

  if (meLoading) return <div>로딩...</div>;

  if (!me) return <div>로그인이 필요합니다.</div>;

  if (isLoading) return <div>대시보드 로딩중...</div>;

  const activeEnrollments = data?.filter((e) => e.status === 'active') ?? [];

  return (
    <div className="lg:col-span-3">
      <section className="course-info bg-zinc-50 dark:bg-zinc-800 p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          수강 중인 강좌
        </h2>
        <div className="space-y-6">
          {activeEnrollments.length > 0 ? (
            activeEnrollments.map((e) => (
              <div
                key={e.id}
                className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
              >
                <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {e.course.title}
                </div>
                <div className="w-full h-32 object-cover rounded-xl mb-4">
                  <CircularProgressBar progress={e.progress} />
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[400px] bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                현재 수강 중인 강좌가 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
