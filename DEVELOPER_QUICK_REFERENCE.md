# Strativa Developer Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start mock API server
npm run json-server

# Start WebSocket server (optional)
node websocket-server-example.js

# Start development server
npm run dev
```

## 📁 Key Files & Directories

### Core Application

- `src/app/` - Next.js App Router pages
- `src/shared/components/` - Reusable UI components
- `src/shared/stores/` - Zustand state management
- `src/shared/services/` - API and WebSocket services
- `src/shared/hooks/` - Custom React hooks
- `src/shared/validations/` - Zod validation schemas

### Configuration

- `db.json` - Mock database
- `json-server.json` - API server config
- `websocket-server-example.js` - WebSocket server
- `tailwind.config.js` - Tailwind CSS config

## 🧩 Common Components

### Forms

```tsx
// Multi-step form
<MultiStepForm steps={steps} currentStep={currentStep} />

// Login form
<LoginForm onSubmit={handleLogin} />

// File upload
<FileUpload onFileSelect={handleFile} accept=".pdf,.jpg" />
```

### Data Display

```tsx
// Data table with pagination
<DataTable data={data} columns={columns} pagination={pagination} />

// Stat cards
<StatCard title="Total" value="1,234" change="+12.5%" />

// Progress stepper
<ProgressStepper steps={steps} currentStep={currentStep} />
```

## 📊 State Management

### Store Usage

```tsx
// Dashboard store
const { companies, loading, actions } = useDashboardStore();

// Sidebar store
const { isOpen, toggle } = useSidebarStore();

// Chat store
const { conversations, sendMessage } = useChatStore();
```

### Store Pattern

```tsx
interface StoreState {
  data: DataType[];
  loading: boolean;
  error: string | null;
  actions: {
    fetchData: () => Promise<void>;
    setData: (data: DataType[]) => void;
  };
}
```

## 🔌 API Integration

### REST API

```tsx
// API service
import { companiesService } from "@/shared/services/companiesService";

const companies = await companiesService.getCompanies();
```

### WebSocket

```tsx
// WebSocket service
import { websocketService } from "@/shared/services/websocketService";

websocketService.connect(userId, token);
websocketService.sendMessage(conversationId, text);
```

## ✅ Validation

### Zod Schemas

```tsx
// Form validation
import { loginSchema } from "@/shared/validations";

const result = loginSchema.safeParse(formData);
if (!result.success) {
  console.log(result.error.errors);
}
```

### Custom Hook

```tsx
// Form validation hook
import { useFormValidation } from "@/shared/hooks/useFormValidation";

const { errors, validate, clearError } = useFormValidation(schema);
```

## 🎨 Styling

### Tailwind Classes

```tsx
// Common patterns
className = "bg-white rounded-lg shadow-sm p-6";
className = "flex items-center justify-between";
className = "text-sm text-gray-600";
className = "hover:bg-gray-50 transition-colors";
```

### Component Styling

```tsx
// Card wrapper
<div className="bg-white rounded-xl shadow-sm p-6">

// Button styles
<button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">

// Input styles
<input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
```

## 🔄 Common Patterns

### Loading States

```tsx
const [loading, setLoading] = useState(false);

if (loading) {
  return <div className="animate-pulse">Loading...</div>;
}
```

### Error Handling

```tsx
const [error, setError] = useState<string | null>(null);

if (error) {
  return <div className="text-red-600">{error}</div>;
}
```

### Conditional Rendering

```tsx
{
  isAuthenticated ? <Dashboard /> : <LoginForm />;
}
```

## 📱 Responsive Design

### Breakpoints

```tsx
// Mobile first
className = "w-full md:w-1/2 lg:w-1/3";

// Responsive text
className = "text-sm md:text-base lg:text-lg";

// Responsive spacing
className = "p-4 md:p-6 lg:p-8";
```

## 🚨 Error Boundaries

### API Error Handling

```tsx
try {
  const data = await api.getData();
} catch (error) {
  console.error("API Error:", error);
  setError(error.message);
}
```

### WebSocket Error Handling

```tsx
websocketService.onConnectionChange((connected) => {
  if (!connected) {
    setError("Connection lost. Reconnecting...");
  }
});
```

## 🔧 Development Tools

### Debugging

```tsx
// Console logging
console.log("Debug:", data);

// React DevTools
// Install React Developer Tools browser extension

// Zustand DevTools
// Already configured in stores
```

### Performance

```tsx
// React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Component logic */}</div>;
});

// useCallback for handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

## 📝 Code Conventions

### File Naming

- Components: `PascalCase.tsx`
- Pages: `kebab-case/page.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase.types.ts`

### Import Order

```tsx
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Third-party libraries
import { create } from "zustand";

// 3. Internal imports
import { Component } from "@/shared/components";
import { useHook } from "@/shared/hooks";
import { api } from "@/shared/services";

// 4. Type imports
import type { ComponentProps } from "./types";
```

### Component Structure

```tsx
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState();

  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 3. Handlers
  const handleClick = () => {
    // Handler logic
  };

  // 4. Render
  return <div>{/* JSX */}</div>;
};
```

## 🚀 Deployment

### Build Commands

```bash
# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Environment Variables

```bash
# Development
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3002

# Production
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-server.com
```

## 🐛 Common Issues & Solutions

### Build Errors

```bash
# Clear cache
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Check types
npx tsc --noEmit
```

### API Connection Issues

1. Check if json-server is running
2. Verify CORS settings
3. Check network tab for errors

### WebSocket Issues

1. Ensure WebSocket server is running
2. Check environment variables
3. Verify CORS configuration

## 📚 Useful Commands

```bash
# Install dependencies
npm install

# Add new dependency
npm install package-name

# Run development server
npm run dev

# Start mock API
npm run json-server

# Build for production
npm run build

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 🔗 Quick Links

- [Full Documentation](./PROJECT_DOCUMENTATION.md)
- [WebSocket Integration](./WEBSOCKET_INTEGRATION.md)
- [API Endpoints](./db.json)
- [Component Library](./src/shared/components/)

---

_Last updated: December 2024_
