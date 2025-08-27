# Zustand Store Configuration

This directory contains the Zustand store configuration for the Strativa app.

## Store Structure

### Main App Store (`store.ts`)
- Global app state (loading, theme, etc.)
- Basic user information
- App-wide actions

### Auth Store (`store/authStore.ts`)
- Authentication state management
- User login/logout/register functionality
- Token management
- Integration with auth API

## Usage Examples

### Using the Auth Store

```tsx
import { useAuthStore } from '@/config/store';

function LoginComponent() {
  const { login, isLoading, error, user } = useAuthStore();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect or show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
}
```

### Using the API Hook

```tsx
import { useApi } from '@/shared/hooks';
import { authApi } from '@/shared/api';

function ApiExample() {
  const { data, isLoading, error, execute } = useApi(authApi.getCurrentUser);

  const handleFetchUser = () => {
    execute();
  };

  return (
    <div>
      <button onClick={handleFetchUser} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch User'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>User: {data.name}</p>}
    </div>
  );
}
```

## Store Features

- **Persistence**: Stores are automatically persisted to localStorage
- **DevTools**: Redux DevTools integration for debugging
- **TypeScript**: Full type safety
- **Error Handling**: Built-in error management
- **Loading States**: Global and local loading states

## API Integration

The stores are designed to work seamlessly with the API services in `src/shared/api/`. Each store can make API calls and update its state accordingly.

## Best Practices

1. **Use the `useApi` hook** for API calls with automatic loading and error handling
2. **Keep stores focused** - each store should handle a specific domain
3. **Use TypeScript** - all stores are fully typed
4. **Handle errors gracefully** - stores include error states
5. **Persist important data** - authentication state is automatically persisted
