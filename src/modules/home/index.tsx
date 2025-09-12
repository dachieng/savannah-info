"use client";

import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button";
import { formatReleaseYear, formatRating } from "@/helpers";
import type { ITMDBMovie } from "@/lib/types/movies";
import { getMovieImageUrl, getTopRatedMovies } from "@/services/movies.service";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const {
    data: moviesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => getTopRatedMovies(1),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const movies = moviesData?.results || [];
  const currentMovie: ITMDBMovie | null = movies[currentMovieIndex] || null;

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 600000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (isLoading) {
    return (
      <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </section>
    );
  }

  if (error || !currentMovie) {
    return (
      <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">Unable to load movies</div>
      </section>
    );
  }

  const backdropUrl =
    getMovieImageUrl(
      currentMovie.backdrop_path,
      "w1920_and_h800_multi_faces"
    ) || "/movie-backdrop.png";

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={backdropUrl || "/placeholder.svg"}
          alt={`${currentMovie.title} backdrop`}
          className="w-full h-full object-cover transition-opacity duration-1000"
          key={currentMovie.id}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="px-4 md:px-16 max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-destructive text-white px-2 py-1 text-sm font-bold">
              TMDB
            </div>
            <span className="text-gray-300 text-sm font-medium">TOP RATED</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight text-balance">
            {currentMovie.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl text-pretty">
            {currentMovie.overview}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg flex items-center space-x-2"
            >
              <Play className="h-6 w-6 fill-current" />
              <span>Play</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-gray-600/80 text-white hover:bg-gray-600/60 font-semibold px-8 py-3 text-lg flex items-center space-x-2 backdrop-blur-sm"
            >
              <Info className="h-6 w-6" />
              <span>More Info</span>
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="bg-gray-800/80 px-2 py-1 rounded">
              {formatReleaseYear(currentMovie?.release_date ?? "")}
            </span>
            <span className="bg-gray-800/80 px-2 py-1 rounded">
              ⭐ {formatRating(currentMovie.vote_average)}
            </span>
            <span className="bg-gray-800/80 px-2 py-1 rounded">HD</span>
            <div className="flex items-center space-x-1">
              <span>Movie {currentMovieIndex + 1}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>of {movies.length}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-4 md:right-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="rounded-full w-10 h-10 p-0 bg-gray-800/60 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {movies.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMovieIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentMovieIndex
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
