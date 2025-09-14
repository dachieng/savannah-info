import { render, screen } from '../utils/test-utils';
import { Button } from '@/components/ui/Button';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  it('should render button with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should render button with custom text', () => {
    render(<Button>Custom Text</Button>);

    expect(
      screen.getByRole('button', { name: /custom text/i })
    ).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled button/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply variant styles', () => {
    render(<Button variant="primary">Primary Button</Button>);

    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('bg-primary');
  });

  it('should apply size styles', () => {
    render(<Button size="sm">Small Button</Button>);

    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('h-9');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('should render with custom type attribute', () => {
    render(<Button type="submit">Submit Button</Button>);

    const button = screen.getByRole('button', { name: /submit button/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  describe('asChild prop', () => {
    it('should render as a link when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link', { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    it('should not have type attribute when asChild is true', () => {
      render(
        <Button asChild type="submit">
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link', { name: /link button/i });
      expect(link).not.toHaveAttribute('type');
    });
  });

  describe('variants', () => {
    const variants = [
      'default',
      'destructive',
      'ghost',
      'link',
      'outline',
      'primary',
      'secondary',
      'success',
    ] as const;

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        render(<Button variant={variant}>{variant} Button</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['default', 'icon', 'lg', 'sm'] as const;

    sizes.forEach(size => {
      it(`should render ${size} size correctly`, () => {
        render(<Button size={size}>{size} Button</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  it('should forward additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Label">
        Button
      </Button>
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom Label');
  });
});
