'use client';

import Image from 'next/image';
import { useInstructorsQuery } from '../api/useInstructorsQuery';

export default function InstructorsPage() {
  const { data: instructors, isLoading, isError } = useInstructorsQuery();

  if (isLoading) return <p className="text-center mt-8">로딩 중...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">
        강사 정보를 불러올 수 없습니다.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        강사 목록
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors?.map((instructor) => (
          <div
            key={instructor.id}
            className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800 hover:shadow-md transition"
          >
            {instructor.profileImage && (
              <Image
                src={instructor.profileImage}
                alt={instructor.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              {instructor.name}
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
              {instructor.bio}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {instructor.specialties.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 px-2 py-1 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
