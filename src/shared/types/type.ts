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
  total: number;
  page: number;
  pageSize: number;
}
