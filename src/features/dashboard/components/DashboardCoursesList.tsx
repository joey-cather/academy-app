'use client';

import Link from 'next/link';
import { useMeQuery } from '../../auth/api/useMeQuery';
import { useDashboardQuery } from '../api/useDashboardQuery';
import { useSearchStore } from '../hooks/useSearchStore';
import CircularProgressBar from './CircularProgressBar';
import Image from 'next/image';
import { useNotification } from '@/src/shared/providers/NotificationProvider';
import { useDashboardMutation } from '../api/useDashboardMutation';
import { useCallback } from 'react';

const DashboardCoursesList = () => {
  const { data: me } = useMeQuery();

  const { data, isLoading, isError, refetch } = useDashboardQuery(me?.id);

  const { statusFilter, categoryFilter, searchKeyword } = useSearchStore();

  const { notify } = useNotification();

  const { mutateAsync } = useDashboardMutation();

  const handleCancelEnrollment = useCallback(
    (enrollmentId: number) => {
      notify({
        type: 'confirm',
        message: '수강을 취소하시겠습니까?',
        onConfirm: async () => {
          try {
            await mutateAsync({ id: enrollmentId });
            refetch();
          } catch (error) {
            if (error instanceof Error) {
              notify({
                type: 'alert',
                message: error.message,
              });
            }
          }
        },
      });
    },
    [notify, mutateAsync]
  );

  if (isLoading) return <div>대시보드 로딩중...</div>;
  if (isError)
    return <p className="text-center mt-8 text-red-600">오류 발생</p>;

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
          <Link key={e.id} href={`/courses/${e.course.id}`}>
            <div className=" bg-zinc-50 dark:bg-zinc-800 p-5 rounded-2xl shadow-md flex flex-col lg:flex-row items-center gap-4 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <div className="w-full lg:w-[30%] flex justify-center lg:justify-start mb-2 lg:mb-0">
                <div className="relative w-40 h-32 sm:w-44 sm:h-36 lg:w-48 lg:h-36 rounded-lg overflow-hidden">
                  <Image
                    src={e.course.thumbnail ?? '/placeholder.png'}
                    alt={e.course.title}
                    fill
                    sizes="(max-width: 640px) 10rem, (max-width: 1024px) 11rem, 12rem"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full lg:w-[35%] flex flex-col justify-center gap-2 text-center sm:text-left lg:text-left mb-2 sm:mb-0">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {e.course.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {e.course.category} • {e.course.level} • {e.course.price}원
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={e.course.instructor.profileImage}
                      alt={e.course.instructor.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                      unoptimized={true} // SVG 안전하게 렌더링
                    />
                  </div>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Link 클릭 막기
                    e.preventDefault(); // 혹시 Link 기본 동작 막기
                    notify({
                      type: 'alert',
                      message: '개발 예정입니다.',
                    });
                  }}
                  className="w-32 px-3 py-1 bg-zinc-700 dark:bg-zinc-600 text-white rounded hover:bg-zinc-500 text-sm"
                >
                  이어서 보기
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Link 클릭 막기
                    e.preventDefault(); // 혹시 Link 기본 동작 막기
                    notify({
                      type: 'alert',
                      message: '개발 예정입니다.',
                    });
                  }}
                  className="w-32 px-3 py-1 bg-zinc-700 dark:bg-zinc-600 text-white rounded hover:bg-zinc-500 text-sm"
                >
                  리뷰 작성
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation(); // Link 클릭 막기
                    event.preventDefault(); // 혹시 Link 기본 동작 막기
                    handleCancelEnrollment(e.id);
                  }}
                  className="w-32 px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-400 text-sm"
                >
                  수강 취소
                </button>
              </div>
            </div>
          </Link>
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
