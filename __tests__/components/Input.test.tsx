import { render, screen } from '../utils/test-utils';
import { Input } from '@/components/ui/Input';
import userEvent from '@testing-library/user-event';

describe('Input Component', () => {
  it('should render input with default props', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should render input with placeholder', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character
  });

  it('should render with custom type', () => {
    render(<Input type="email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should render password input', () => {
    render(<Input type="password" />);

    const input = screen.getByDisplayValue(''); // Password inputs don't have role="textbox"
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should apply custom className', () => {
    render(<Input className="custom-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should render with start icon', () => {
    const StartIcon = () => <span data-testid="start-icon">📧</span>;

    render(<Input startIcon={<StartIcon />} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('should render with end icon', () => {
    const EndIcon = () => <span data-testid="end-icon">👁️</span>;

    render(<Input endIcon={<EndIcon />} />);

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should render with both start and end icons', () => {
    const StartIcon = () => <span data-testid="start-icon">📧</span>;
    const EndIcon = () => <span data-testid="end-icon">👁️</span>;

    render(<Input startIcon={<StartIcon />} endIcon={<EndIcon />} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should apply correct padding when start icon is present', () => {
    const StartIcon = () => <span data-testid="start-icon">📧</span>;

    render(<Input startIcon={<StartIcon />} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };

    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should handle additional props', () => {
    render(<Input data-testid="custom-input" aria-label="Custom Input" />);

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('aria-label', 'Custom Input');
  });

  it('should be focusable', async () => {
    const user = userEvent.setup();

    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    expect(input).toHaveFocus();
  });

  it('should handle form events correctly', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
