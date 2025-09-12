import { Suspense } from "react";

import Loading from "@/components/ui/Loader";
import MovieDetailContent from "@/modules/movie";

const MovieDetailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loading />
            <p className="text-muted-foreground">Loading movie details...</p>
          </div>
        </div>
      }
    >
      <MovieDetailContent />
    </Suspense>
  );
};

export default MovieDetailPage;
