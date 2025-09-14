# Testing Documentation

This project includes comprehensive testing coverage using Jest and React Testing Library.

## Test Structure

- `__tests__/` - Main test directory
  - `api/` - API route tests
  - `components/` - Component tests
  - `hooks/` - Custom hook tests
  - `lib/` - Library/utility function tests
  - `services/` - Service layer tests
  - `utils/` - Test utilities and mock data

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test Button.test.tsx

# Run tests for specific directory
pnpm test __tests__/components/
```

## Test Coverage

The test suite covers:

### Authentication System

- ✅ Password hashing and verification
- ✅ JWT token creation and verification
- ✅ User registration and login API endpoints
- ✅ Auth service functions
- ✅ Session management hooks

### Database Operations

- ✅ User creation and retrieval
- ✅ Email validation and uniqueness
- ✅ Error handling for file operations

### UI Components

- ✅ Button component variants and interactions
- ✅ Input component with icons and validation
- ✅ Component accessibility and props forwarding

### Custom Hooks

- ✅ Debounce hook functionality
- ✅ Session state management
- ✅ API integration hooks

### Services

- ✅ Movies API service functions
- ✅ Authentication service functions
- ✅ Error handling and response parsing

## Test Utilities

### Mock Data

Located in `__tests__/utils/mock-data.ts`, provides:

- Mock user objects
- Mock movie data
- Mock API responses

### Test Utilities

Located in `__tests__/utils/test-utils.tsx`, provides:

- Custom render function with providers
- Query client setup for testing
- Common testing utilities

## Writing Tests

### Component Tests

```typescript
import { render, screen } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Hook Tests

```typescript
import { renderHook, act } from '@testing-library/react';

describe('useMyHook', () => {
  it('should return expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe('expected');
  });
});
```

### API Tests

```typescript
/**
 * @jest-environment node
 */
import { POST } from '@/app/api/my-route/route';
import { NextRequest } from 'next/server';

describe('/api/my-route', () => {
  it('should handle POST requests', async () => {
    const req = new NextRequest('http://localhost/api/my-route', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
  });
});
```

## Mocking Guidelines

### Global Mocks

- `fetch` is mocked globally for service tests
- Environment variables are set in `jest.setup.js`
- Next.js modules are automatically mocked

### Module Mocking

```typescript
// Mock external dependencies
jest.mock('@/lib/db', () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

// Mock with implementation
const mockFn = jest.fn().mockImplementation(() => 'mocked value');
```

## Coverage Goals

- Aim for 80%+ overall coverage
- 100% coverage for critical paths (auth, payments, etc.)
- All API endpoints should have tests
- All custom hooks should have tests
- UI components should test user interactions

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the component does, not how it does it
2. **Use Descriptive Test Names** - Test names should clearly describe what is being tested
3. **Arrange, Act, Assert** - Structure tests with clear setup, action, and verification
4. **Mock External Dependencies** - Keep tests isolated and fast
5. **Test Error Cases** - Don't just test the happy path
6. **Keep Tests Simple** - One assertion per test when possible
