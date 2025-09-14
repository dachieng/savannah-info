import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;

      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      );

      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
      expect(result).not.toContain('disabled-class');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');

      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should handle undefined and null values', () => {
      const result = cn('valid-class', undefined, null, 'another-class');

      expect(result).toContain('valid-class');
      expect(result).toContain('another-class');
    });

    it('should merge conflicting Tailwind classes', () => {
      // twMerge should handle conflicting classes
      const result = cn('p-4', 'p-6');

      // Should only contain the later class
      expect(result).not.toContain('p-4');
      expect(result).toContain('p-6');
    });

    it('should handle object notation', () => {
      const result = cn({
        'base-class': true,
        'conditional-class': true,
        'false-class': false,
      });

      expect(result).toContain('base-class');
      expect(result).toContain('conditional-class');
      expect(result).not.toContain('false-class');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle mixed input types', () => {
      const result = cn(
        'base',
        ['array1', 'array2'],
        { 'object-class': true, 'false-class': false },
        'final'
      );

      expect(result).toContain('base');
      expect(result).toContain('array1');
      expect(result).toContain('array2');
      expect(result).toContain('object-class');
      expect(result).not.toContain('false-class');
      expect(result).toContain('final');
    });
  });
});
