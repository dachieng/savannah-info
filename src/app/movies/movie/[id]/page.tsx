import { Suspense } from "react";

import Loading from "@/components/ui/Loader";
import MovieDetailContent from "@/modules/movie";
import AuthGuard from "@/modules/auth/AuthGuard";

const MovieDetailPage = () => {
  return (
    <AuthGuard>
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
    </AuthGuard>
  );
};

export default MovieDetailPage;
