export interface ApiSuccess<T> {
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

export type ApiResponse<T> = ApiSuccess<T>;

export interface PaginatedResponse<T> {
  items: T[];
  page: number; // 현재 페이지
  pageSize: number; // 한 페이지의 item 수
  total: number; // 전체 개수 (필터링 적용 후)
  totalPages: number; // 전체 페이지 수
}
