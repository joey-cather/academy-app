'use client';

import { usePaginatedCoursesQuery } from '../api/useCoursesQuery';
import { useSearchParams } from 'next/navigation';
import CourseCard from './CourseCard';
import { isCourseCategory } from '../types/type';
import { useEffect } from 'react';

const CoursesList = () => {
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get('category');

  const category =
    rawCategory && isCourseCategory(rawCategory) ? rawCategory : undefined;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedCoursesQuery({
    category,
  });

  const courses = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const loadMoreHandler = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;
      if (nearBottom) {
        loadMoreHandler();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p className="text-center mt-8">로딩 중...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">
        강좌를 불러올 수 없습니다.
      </p>
    );

  if (!courses?.length)
    return (
      <p className="text-center mt-8 text-zinc-500">검색 결과가 없습니다.</p>
    );

  return (
    <div>
      <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg shadow-md mb-6">
        <div className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
          {total}개의 강좌가 검색되었습니다.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};

export default CoursesList;
