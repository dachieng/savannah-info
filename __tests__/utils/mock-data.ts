// Mock data for tests
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  passwordHash: '$2a$10$hashedpassword',
  firstName: 'Test',
  lastName: 'User',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
  adult: false,
  original_language: 'en',
  original_title: 'Test Movie',
  popularity: 100.5,
  video: false,
};

export const mockMovieDetail = {
  ...mockMovie,
  runtime: 120,
  budget: 100000000,
  revenue: 200000000,
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
  ],
  production_companies: [
    { id: 1, name: 'Test Studios', logo_path: null, origin_country: 'US' },
  ],
  spoken_languages: [
    { iso_639_1: 'en', name: 'English', english_name: 'English' },
  ],
  status: 'Released',
  tagline: 'A test movie',
  homepage: 'https://testmovie.com',
  imdb_id: 'tt1234567',
  belongs_to_collection: null,
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
};

export const mockCredits = {
  id: 1,
  cast: [
    {
      id: 1,
      name: 'Test Actor',
      character: 'Test Character',
      profile_path: '/test-actor.jpg',
      order: 0,
      cast_id: 1,
      credit_id: 'test-credit-id',
      adult: false,
      gender: 2,
      known_for_department: 'Acting',
      original_name: 'Test Actor',
      popularity: 50.0,
    },
  ],
  crew: [
    {
      id: 2,
      name: 'Test Director',
      job: 'Director',
      department: 'Directing',
      profile_path: '/test-director.jpg',
      credit_id: 'test-director-credit-id',
      adult: false,
      gender: 2,
      known_for_department: 'Directing',
      original_name: 'Test Director',
      popularity: 30.0,
    },
  ],
};

export const mockMoviesResponse = {
  page: 1,
  results: [mockMovie],
  total_pages: 1,
  total_results: 1,
};
