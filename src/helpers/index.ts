export const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/logout",
  "/api/auth/me",
  "/_next",
  "/favicon.ico",
  "/assets",
  "/public",
  "/", // Allow access to home page
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

export const formatRuntime = (runtime: number | null) => {
  if (!runtime) return "Unknown";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatCurrency = (amount: number) => {
  if (amount === 0) return "Unknown";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
