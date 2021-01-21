export interface ApiResponse<T> {
  data: T;
  totalPages: number;
  totalItems: number;
}
