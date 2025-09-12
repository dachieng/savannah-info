export interface ITMDBListResponse<T> {
  results?: T[];
  page?: number;
  hasNext?: boolean;
  total_pages?: number;
  total_results?: number;
}

export interface ITMDBMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}
