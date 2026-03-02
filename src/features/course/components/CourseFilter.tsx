'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { courseCategories } from '../types/type';
import { useCallback } from 'react';

export function CourseFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') ?? '';

  const updateParams = useCallback(
    (params: { category?: string }) => {
      const newParams = new URLSearchParams(searchParams);

      if (params.category !== undefined) {
        if (params.category) newParams.set('category', params.category);
        else newParams.delete('category');
      }

      router.push(`/courses?${newParams.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams({ category: '' })}
          className={`px-3 py-1 rounded-full text-sm ${
            !currentCategory
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
          }`}
        >
          전체
        </button>

        {courseCategories.map((category) => {
          const active = currentCategory === category;

          return (
            <button
              key={category}
              onClick={() => updateParams({ category })}
              className={`px-3 py-1 rounded-full text-sm ${
                active
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
