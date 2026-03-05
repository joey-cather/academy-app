'use client';

import Image from 'next/image';
import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';
import CircularProgressBar from './CircularProgressBar';

export const ActiveCourses = () => {
  const { data: me } = useMeQuery();
  const { data, isLoading, isError } = useDashboardQuery(me?.id);

  if (isLoading) return <div>대시보드 로딩중...</div>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

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
                className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-sm flex"
              >
                <div className="w-1/2 pl-4 flex flex-col justify-center">
                  <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {e.course.title}
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="relative w-6 h-6 rounded-full mr-2 overflow-hidden">
                      <Image
                        src={e.course.instructor.profileImage}
                        alt={e.course.instructor.name}
                        fill
                        className="object-cover"
                        unoptimized={true} // SVG 안전하게 렌더링
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {e.course.instructor.name}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {e.course.category} • {e.course.level} • {e.course.price}원
                  </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                  <CircularProgressBar
                    progress={e.progress}
                    strokeColor={
                      e.status === 'completed'
                        ? 'green'
                        : e.status === 'active'
                          ? 'blue'
                          : 'gray'
                    }
                  />
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
