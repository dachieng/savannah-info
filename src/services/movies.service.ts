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

const getPopularMovies = async (
  page = 1
): Promise<ITMDBListResponse<ITMDBMovie>> => {
  try {
    const res = await GET("/movie/popular", {
      params: {
        language: "en-US",
        page,
      },
    });

    return res?.data ?? TMDBNoDataResponse;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return TMDBNoDataResponse;
  }
};

const searchMovies = async (
  query: string,
  page = 1
): Promise<ITMDBListResponse<ITMDBMovie>> => {
  try {
    const res = await GET("/search/movie", {
      params: {
        language: "en-US",
        query,
        page,
        include_adult: false,
      },
    });

    return res?.data ?? TMDBNoDataResponse;
  } catch (error) {
    console.error("Error searching movies:", error);
    return TMDBNoDataResponse;
  }
};

export { getTopRatedMovies, getPopularMovies, searchMovies };
