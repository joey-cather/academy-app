'use client';

import { useCoursesQuery } from '../api/useCoursesQuery';
import { useSearchParams } from 'next/navigation';
import { CourseCard } from './CourseCard';
import { isCourseCategory } from '../types/type';

export function CourseList() {
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get('category');

  const category =
    rawCategory && isCourseCategory(rawCategory) ? rawCategory : undefined;

  const {
    data: courses,
    isLoading,
    isError,
  } = useCoursesQuery({
    category,
  });

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
      <div className="text-xs text-gray-600 dark:text-gray-300 mt-4">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {courses.length}개의 강좌가 검색되었습니다.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
