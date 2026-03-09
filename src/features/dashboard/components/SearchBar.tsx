'use client';

import { useEffect } from 'react';
import { useSearchStore } from '../hooks/useSearchStore';
import SelectBox from './SelectBox';

const SearchBar = () => {
  const {
    statusFilter,
    categoryFilter,
    searchKeyword,
    setStatusFilter,
    setCategoryFilter,
    setSearchKeyword,
  } = useSearchStore();

  const statusOptions = [
    { label: '상태 전체', value: '' },
    { label: '수강 중', value: 'active' },
    { label: '완료', value: 'completed' },
    { label: '취소', value: 'cancelled' },
  ];

  const categoryOptions = [
    { label: '카테고리 전체', value: '' },
    { label: '영어', value: 'english' },
    { label: '수학', value: 'math' },
    { label: '과학', value: 'science' },
    { label: '코딩', value: 'coding' },
  ];

  useEffect(() => {
    setStatusFilter('');
    setCategoryFilter('');
    setSearchKeyword('');
  }, [setStatusFilter, setCategoryFilter, setSearchKeyword]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl shadow-md items-center mb-8">
      {/* 상태 필터 */}
      <SelectBox
        value={statusFilter}
        setValue={setStatusFilter}
        options={statusOptions}
        width="w-25"
      />

      {/* 카테고리 필터 */}
      <SelectBox
        value={categoryFilter}
        setValue={setCategoryFilter}
        options={categoryOptions}
        width="w-35"
      />

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
