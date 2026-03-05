'use client';

import { useSearchStore } from '../hooks/useSearchStore';

const SearchBar = () => {
  const {
    statusFilter,
    categoryFilter,
    searchKeyword,
    setStatusFilter,
    setCategoryFilter,
    setSearchKeyword,
  } = useSearchStore();

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl shadow-md items-center mb-8">
      {/* 상태 필터 */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full sm:w-auto border border-zinc-300 dark:border-zinc-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-zinc-900 dark:text-gray-100"
      >
        <option value="">상태 전체</option>
        <option value="active">수강 중</option>
        <option value="completed">완료</option>
        <option value="cancelled">취소</option>
      </select>

      {/* 카테고리 필터 */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full sm:w-auto border border-zinc-300 dark:border-zinc-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-zinc-900 dark:text-gray-100"
      >
        <option value="">카테고리 전체</option>
        <option value="english">영어</option>
        <option value="math">수학</option>
        <option value="science">과학</option>
        <option value="coding">코딩</option>
      </select>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="강좌 이름 / 강사 이름 검색"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="w-full sm:flex-1 border border-zinc-300 dark:border-zinc-600 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-zinc-900 dark:text-gray-100"
      />
    </div>
  );
};

export default SearchBar;
