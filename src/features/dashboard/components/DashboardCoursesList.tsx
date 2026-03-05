'use client';

import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';
import { useSearchStore } from '../hooks/useSearchStore';
import CircularProgressBar from './CircularProgressBar';

const DashboardCoursesList = () => {
  const { data: me } = useMeQuery();

  if (!me) return <div>로그인이 필요합니다.</div>;

  const { data, isLoading } = useDashboardQuery(me.id);

  if (isLoading) return <div>대시보드 로딩중...</div>;

  if (!data) return null;

  const { statusFilter, categoryFilter, searchKeyword } = useSearchStore();

  const sortedEnrollments =
    data?.sort(
      (a, b) =>
        new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
    ) ?? [];

  const filtered = sortedEnrollments.filter((e) => {
    const matchStatus = statusFilter ? e.status === statusFilter : true;
    const matchCategory = categoryFilter
      ? e.course.category === categoryFilter
      : true;
    const matchKeyword =
      e.course.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      e.course.instructor.name
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    return matchStatus && matchCategory && matchKeyword;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
      {filtered.length > 0 ? (
        filtered.map((e) => (
          <div
            key={e.id}
            className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl shadow-md flex flex-col lg:flex-row items-center gap-4"
          >
            <div className="w-full lg:w-[30%] flex justify-center lg:justify-start mb-2 lg:mb-0">
              <img
                src={e.course.thumbnail ?? '/placeholder.png'}
                alt={e.course.title}
                className="w-40 h-32 sm:w-44 sm:h-36 lg:w-48 lg:h-36 rounded-lg object-cover"
              />
            </div>

            <div className="w-full lg:w-[35%] flex flex-col justify-center gap-2 text-center sm:text-left lg:text-left mb-2 sm:mb-0">
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {e.course.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {e.course.category} • {e.course.level} • {e.course.price}원
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <img
                  src={e.course.instructor.profileImage}
                  alt={e.course.instructor.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {e.course.instructor.name}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {`• 수강 시작: ${e.enrolledAt}`}
                {e.completedAt && ` / • 수강 완료: ${e.completedAt}`}
              </div>
            </div>

            <div className="w-full sm:w-full lg:w-[20%] flex justify-center items-center mb-2 sm:mb-0">
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

            <div className="w-full sm:w-full lg:w-[15%] flex flex-col items-center gap-2">
              <button className="w-32 px-3 py-1 bg-zinc-700 dark:bg-zinc-600 text-white rounded hover:bg-zinc-500 text-sm">
                이어서 보기
              </button>
              <button className="w-32 px-3 py-1 bg-zinc-700 dark:bg-zinc-600 text-white rounded hover:bg-zinc-500 text-sm">
                리뷰 작성
              </button>
              <button className="w-32 px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-400 text-sm">
                수강 취소
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center min-h-[200px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl shadow-inner">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            검색된 강좌가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardCoursesList;
