'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

const CourseSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentKeyword = searchParams.get('keyword') ?? '';

  const [inputValue, setInputValue] = useState(currentKeyword);
  const [isComposing, setIsComposing] = useState(false);

  const updateParams = useCallback(
    (params: { keyword?: string }) => {
      const newParams = new URLSearchParams(searchParams);

      if (params.keyword !== undefined) {
        if (params.keyword) newParams.set('keyword', params.keyword);
        else newParams.delete('keyword');
      }

      router.push(`/courses?${newParams.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl shadow-md items-center mb-8">
      {/* 검색창 */}
      <input
        type="text"
        placeholder="강좌 이름 검색"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (!isComposing) {
            updateParams({ keyword: e.target.value });
          }
        }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          updateParams({ keyword: e.currentTarget.value }); // 조합 완료 후 URL 업데이트
        }}
        className="w-full sm:flex-1 border border-zinc-300 dark:border-zinc-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-zinc-900 dark:text-gray-100"
      />
    </div>
  );
};

export default CourseSearch;
