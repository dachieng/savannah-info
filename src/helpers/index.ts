export const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/logout",
  "/api/auth/me",
  "/_next",
  "/favicon",
  "/assets",
  "/public",
];

export const TMDBNoDataResponse = {
  results: [],
  page: 1,
  hasNext: false,
  total_pages: 1,
  total_results: 0,
};

export const formatReleaseYear = (releaseDate: string) => {
  return new Date(releaseDate).getFullYear();
};

export const formatRating = (rating: number) => {
  return Math.round(rating * 10) / 10;
};
