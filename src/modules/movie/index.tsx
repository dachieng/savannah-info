"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieImageUrl,
} from "@/services/movies.service";
import {
  formatReleaseYear,
  formatRating,
  formatRuntime,
  formatCurrency,
} from "@/helpers";
import CastGrid from "./components/CastGrid";
import { useQuery } from "@tanstack/react-query";

const MovieDetailContent = () => {
  const { id } = useParams();
  const movieId = String(id || "");

  // fetch details
  const detailsQ = useQuery({
    queryKey: ["movie", "details", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000,
  });

  // fetch credits (after we know id)
  const creditsQ = useQuery({
    queryKey: ["movie", "credits", movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = detailsQ.isLoading || creditsQ.isLoading;
  const isError = detailsQ.isError || creditsQ.isError;
  const movieDetails = detailsQ.data;
  const movieCredits = creditsQ.data;

  if (!isLoading && !isError && !movieDetails) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Movie not found.</p>
        <Link href="/movies">
          <Button variant="primary">Back to Movies</Button>
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Failed to load movie.</p>
        <Button
          onClick={() => {
            detailsQ.refetch();
            creditsQ.refetch();
          }}
          variant="outline"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (isLoading || !movieDetails) {
    return (
      <div className="relative h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-muted animate-pulse" />
      </div>
    );
  }

  const backdropUrl = getMovieImageUrl(movieDetails.backdrop_path, "w1280");
  const posterUrl = getMovieImageUrl(movieDetails.poster_path, "w500");
  const rating = formatRating(movieDetails.vote_average);
  const releaseYear = formatReleaseYear(movieDetails.release_date ?? "");
  const runtime = formatRuntime(movieDetails.runtime);
  const budget = formatCurrency(movieDetails.budget);
  const revenue = formatCurrency(movieDetails.revenue);

  const director = movieCredits?.crew.find((m) => m.job === "Director");
  const writers = movieCredits?.crew
    .filter(
      (m) => m.job === "Writer" || m.job === "Screenplay" || m.job === "Story"
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={backdropUrl || "/movie-backdrop.png"}
          alt={movieDetails?.title ?? "Movie backdrop"}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link href="/movies">
            <Button
              variant="secondary"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white border-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movies
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 md:w-64 aspect-[2/3] relative overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={posterUrl || "/movie-poster.png"}
                    alt={movieDetails?.title ?? "Movie poster"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Movie Details */}
              <div className="flex-1 text-black">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-balance">
                  {movieDetails.title}
                </h1>
                {movieDetails.tagline && (
                  <p className="text-lg md:text-xl text-primary mb-4 italic text-pretty">
                    "{movieDetails.tagline}"
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-shadow-secondary-dark">
                      ({movieDetails.vote_average} votes)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>{releaseYear}</span>
                  </div>
                  {movieDetails.runtime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      <span>{runtime}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {movieDetails.genres.map((genre) => (
                    <Badge key={genre.id} variant="primary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-secondary-dark text-lg leading-relaxed max-w-3xl text-pretty">
                  {movieDetails.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {movieCredits?.cast && movieCredits.cast.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <CastGrid cast={movieCredits.cast} limit={12} />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Movie Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {director && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      Director
                    </h4>
                    <p>{director.name}</p>
                  </div>
                )}

                {writers && writers.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      Writers
                    </h4>
                    <p>{writers.map((w) => w.name).join(", ")}</p>
                  </div>
                )}

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                    Status
                  </h4>
                  <p>{movieDetails.status}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                    Original Language
                  </h4>
                  <p>{movieDetails?.original_language?.toUpperCase()}</p>
                </div>

                {movieDetails.budget > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      Budget
                    </h4>
                    <p>{budget}</p>
                  </div>
                )}

                {movieDetails.revenue > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      Revenue
                    </h4>
                    <p>{revenue}</p>
                  </div>
                )}

                {movieDetails.homepage && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                      Homepage
                    </h4>
                    <a
                      href={movieDetails.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-500 transition-colors flex items-center gap-1"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Production Companies */}
            {movieDetails.production_companies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {movieDetails.production_companies
                      .slice(0, 5)
                      .map((company) => (
                        <div
                          key={company.id}
                          className="flex items-center gap-3"
                        >
                          {company.logo_path ? (
                            <div className="w-12 h-12 relative flex-shrink-0">
                              <Image
                                src={
                                  getMovieImageUrl(company.logo_path, "w92") ||
                                  "/placeholder.svg"
                                }
                                alt={company.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-xs">🏢</span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">
                              {company.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {company.origin_country}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailContent;
