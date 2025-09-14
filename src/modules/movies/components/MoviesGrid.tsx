"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import MovieCard from "./MovieCard";
import MovieSearch from "./MovieSearch";
import { getPopularMovies, searchMovies } from "@/services/movies.service";

const MoviesGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["movies", searchQuery],
    queryFn: ({ pageParam = 1 }) => {
      return searchQuery
        ? searchMovies(searchQuery, pageParam)
        : getPopularMovies(pageParam);
    },
    getNextPageParam: (lastPage) => {
      const current = lastPage?.page ?? 0;
      const total = lastPage?.total_pages ?? 0;
      return current < total ? current + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const totalResults = data?.pages[0]?.total_results ?? 0;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load movies. Please check your internet connection and try
            again.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center mt-4">
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
            {searchQuery ? "Search Results" : "Popular Movies"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {searchQuery
              ? `Found ${totalResults.toLocaleString()} movies for "${searchQuery}"`
              : "Discover the most popular movies right now"}
          </p>
        </div>

        <MovieSearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search for movies..."
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading movies...</span>
        </div>
      )}

      {movies && movies?.length > 0 && (
        <Fragment>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            {movies.map((movie, index) =>
              movie ? <MovieCard key={`${index}`} movie={movie} /> : null
            )}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={ref} className="flex justify-center py-8">
            {isFetchingNextPage && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading more movies...</span>
              </div>
            )}
            {!hasNextPage && movies.length > 0 && (
              <p className="text-muted-foreground">
                You&apos;ve reached the end! Found {movies.length} movies.
              </p>
            )}
          </div>
        </Fragment>
      )}

      {!isLoading && movies.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No movies found</h3>
          <p className="text-muted-foreground mb-4">
            Try searching with different keywords or check your spelling.
          </p>
          <Button onClick={handleClearSearch} variant="outline">
            Browse Popular Movies
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoviesGrid;
