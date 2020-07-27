export interface ApiResponseModel<T> {
  info: {
    page: number;
    results: number;
    seed?: string;
    version?: string;
  };
  results: T;
}
