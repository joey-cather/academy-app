import { create } from 'zustand';

interface SearchState {
  statusFilter: string;
  categoryFilter: string;
  searchKeyword: string;
  setStatusFilter: (statusFilter: string) => void;
  setCategoryFilter: (categoryFilter: string) => void;
  setSearchKeyword: (searchKeyword: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  statusFilter: '',
  categoryFilter: '',
  searchKeyword: '',
  setStatusFilter: (statusFilter: string) => set({ statusFilter }),
  setCategoryFilter: (categoryFilter: string) => set({ categoryFilter }),
  setSearchKeyword: (searchKeyword: string) => set({ searchKeyword }),
}));
