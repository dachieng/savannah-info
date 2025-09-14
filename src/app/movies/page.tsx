import MoviesModule from "@/modules/movies";
import AuthGuard from "@/modules/auth/AuthGuard";

const MoviesPage = () => {
  return (
    <AuthGuard>
      <MoviesModule />
    </AuthGuard>
  );
};

export default MoviesPage;
