import { GET } from "@/config";
import { TMDBNoDataResponse } from "@/helpers";
import {
  ITMDBCredits,
  ITMDBListResponse,
  ITMDBMovie,
  ITMDBMovieDetail,
} from "@/lib/types/movies";

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

const getMovieDetails = async (
  movieId: string
): Promise<ITMDBMovieDetail | null> => {
  try {
    const res = await GET(`/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });

    return res?.data ?? null;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const getMovieCredits = async (
  movieId: string
): Promise<ITMDBCredits | null> => {
  try {
    const res = await GET(`/movie/${movieId}/credits`, {
      params: {
        language: "en-US",
      },
    });

    return res?.data ?? null;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return null;
  }
};

export {
  getTopRatedMovies,
  getPopularMovies,
  searchMovies,
  getMovieCredits,
  getMovieDetails,
};
