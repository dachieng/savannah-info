"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

import { Badge } from "@/components/ui/Badge";
import { formatReleaseYear, formatRating } from "@/helpers";
import { getMovieImageUrl } from "@/services/movies.service";

import type { ITMDBMovie } from "@/lib/types/movies";

interface MovieCardProps {
  movie: ITMDBMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterUrl = getMovieImageUrl(movie.poster_path, "w500");
  const releaseYear = formatReleaseYear(movie?.release_date ?? "");
  const rating = formatRating(movie.vote_average);

  return (
    <Card className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          {posterUrl && !imageError ? (
            <Image
              src={posterUrl || "/placeholder.svg"}
              alt={movie?.title ?? "Movie poster"}
              fill
              className={`object-cover transition-all duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-muted-foreground text-center p-4">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-sm">No Image</p>
              </div>
            </div>
          )}

          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-balance">
                {movie.title}
              </h3>

              <div className="flex items-center gap-2 text-xs mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{releaseYear}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{movie?.vote_average ?? 0}</span>
                </div>
              </div>

              {movie.overview && (
                <p className="text-xs text-gray-200 line-clamp-3 text-pretty">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>

          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-0"
            >
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              {rating}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
