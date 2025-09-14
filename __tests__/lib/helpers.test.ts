import {
  PUBLIC_PATHS,
  TMDBNoDataResponse,
  formatReleaseYear,
  formatRating,
  formatRuntime,
  formatCurrency,
} from '@/helpers';

describe('Helper Functions', () => {
  describe('PUBLIC_PATHS', () => {
    it('should contain expected public paths', () => {
      expect(PUBLIC_PATHS).toContain('/login');
      expect(PUBLIC_PATHS).toContain('/signup');
      expect(PUBLIC_PATHS).toContain('/api/auth/login');
      expect(PUBLIC_PATHS).toContain('/api/auth/signup');
      expect(PUBLIC_PATHS).toContain('/api/auth/logout');
      expect(PUBLIC_PATHS).toContain('/api/auth/me');
    });

    it('should be an array', () => {
      expect(Array.isArray(PUBLIC_PATHS)).toBe(true);
    });
  });

  describe('TMDBNoDataResponse', () => {
    it('should have correct structure for empty response', () => {
      expect(TMDBNoDataResponse).toEqual({
        results: [],
        page: 1,
        hasNext: false,
        total_pages: 1,
        total_results: 0,
      });
    });

    it('should have empty results array', () => {
      expect(TMDBNoDataResponse.results).toEqual([]);
      expect(TMDBNoDataResponse.results.length).toBe(0);
    });
  });

  describe('formatReleaseYear', () => {
    it('should extract year from release date', () => {
      expect(formatReleaseYear('2023-05-15')).toBe(2023);
      expect(formatReleaseYear('1999-12-31')).toBe(1999);
      expect(formatReleaseYear('2000-01-01')).toBe(2000);
    });

    it('should handle different date formats', () => {
      expect(formatReleaseYear('2023-05-15T00:00:00Z')).toBe(2023);
      expect(formatReleaseYear('2023-05-15T12:30:45.123Z')).toBe(2023);
    });

    it('should handle edge cases', () => {
      expect(formatReleaseYear('1970-01-01')).toBe(1970);
      expect(formatReleaseYear('2024-02-29')).toBe(2024); // Leap year
    });
  });

  describe('formatRating', () => {
    it('should round rating to one decimal place', () => {
      expect(formatRating(8.547)).toBe(8.5);
      expect(formatRating(7.333)).toBe(7.3);
      expect(formatRating(9.999)).toBe(10);
    });

    it('should handle whole numbers', () => {
      expect(formatRating(8)).toBe(8);
      expect(formatRating(10)).toBe(10);
      expect(formatRating(0)).toBe(0);
    });

    it('should handle decimal values correctly', () => {
      expect(formatRating(8.1)).toBe(8.1);
      expect(formatRating(8.15)).toBe(8.2);
      expect(formatRating(8.14)).toBe(8.1);
    });

    it('should handle very small numbers', () => {
      expect(formatRating(0.1)).toBe(0.1);
      expect(formatRating(0.05)).toBe(0.1);
      expect(formatRating(0.04)).toBe(0);
    });
  });

  describe('formatRuntime', () => {
    it('should return "Unknown" for null runtime', () => {
      expect(formatRuntime(null)).toBe('Unknown');
    });

    it('should return "Unknown" for zero runtime', () => {
      expect(formatRuntime(0)).toBe('Unknown');
    });

    it('should format minutes only for runtime less than 60', () => {
      expect(formatRuntime(45)).toBe('45m');
      expect(formatRuntime(30)).toBe('30m');
      expect(formatRuntime(1)).toBe('1m');
    });

    it('should format hours and minutes for runtime 60 or more', () => {
      expect(formatRuntime(90)).toBe('1h 30m');
      expect(formatRuntime(120)).toBe('2h 0m');
      expect(formatRuntime(150)).toBe('2h 30m');
    });

    it('should handle exact hour values', () => {
      expect(formatRuntime(60)).toBe('1h 0m');
      expect(formatRuntime(180)).toBe('3h 0m');
    });

    it('should handle very long runtimes', () => {
      expect(formatRuntime(300)).toBe('5h 0m');
      expect(formatRuntime(367)).toBe('6h 7m');
    });
  });

  describe('formatCurrency', () => {
    it('should return "Unknown" for zero amount', () => {
      expect(formatCurrency(0)).toBe('Unknown');
    });

    it('should format currency with dollar sign', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000');
      expect(formatCurrency(500000)).toBe('$500,000');
      expect(formatCurrency(100)).toBe('$100');
    });

    it('should format large amounts with commas', () => {
      expect(formatCurrency(100000000)).toBe('$100,000,000');
      expect(formatCurrency(1500000000)).toBe('$1,500,000,000');
    });

    it('should handle small amounts', () => {
      expect(formatCurrency(1)).toBe('$1');
      expect(formatCurrency(50)).toBe('$50');
      expect(formatCurrency(999)).toBe('$999');
    });

    it('should not show decimal places', () => {
      expect(formatCurrency(1000.5)).toBe('$1,001');
      expect(formatCurrency(999.99)).toBe('$1,000');
    });

    it('should handle negative amounts', () => {
      expect(formatCurrency(-1000)).toBe('-$1,000');
      expect(formatCurrency(-500000)).toBe('-$500,000');
    });
  });
});
