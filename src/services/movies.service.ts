import { GET } from "@/config";
import { TMDBNoDataResponse } from "@/helpers";
import { ITMDBListResponse, ITMDBMovie } from "@/lib/types/movies";

const getTopRatedMovies = async (
  page: number
): Promise<ITMDBListResponse<ITMDBMovie>> => {
  const res = await GET("/movie/top_rated", {
    params: { language: "en-US", page },
  });

  return res?.data ?? TMDBNoDataResponse;
};

export const getMovieImageUrl = (path: string | null, size = "original") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export { getTopRatedMovies };
