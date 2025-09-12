"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/Card";
import type { ITMDBCastMember } from "@/lib/types/movies";
import { getMovieImageUrl } from "@/services/movies.service";

interface CastGridProps {
  cast: ITMDBCastMember[];
  limit?: number;
}

const CastGrid = ({ cast, limit = 6 }: CastGridProps) => {
  const displayCast = cast.slice(0, limit);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {displayCast.map((member) => {
        const profileUrl = getMovieImageUrl(member.profile_path, "w185");

        return (
          <Card
            key={member.id}
            className="overflow-hidden bg-card/50 hover:bg-card transition-colors"
          >
            <CardContent className="p-0">
              <div className="aspect-[2/3] relative overflow-hidden">
                {profileUrl ? (
                  <Image
                    src={profileUrl || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <div className="text-muted-foreground text-center p-2">
                      <div className="text-2xl mb-1">👤</div>
                      <p className="text-xs">No Photo</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm line-clamp-1 text-balance">
                  {member.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 text-pretty">
                  {member.character}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CastGrid;
