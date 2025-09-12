export interface IPaginationResponse<T> {
  results?: T[];
  page?: number;
  hasNext?: boolean;
  total_pages?: number;
  total_results?: number;
}
