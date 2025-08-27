# TypeScript Setup & Type System Guide

## 📋 Overview

This document provides a comprehensive guide to the TypeScript setup and type system implemented in the Strativa investor dashboard project. All types are properly defined and organized to ensure type safety throughout the application.

## 🏗️ Type System Architecture

### Type Organization

```
src/shared/types/
├── index.ts                 # Main type exports
├── common.types.ts          # Common utility types
├── api.types.ts            # API-related types
├── auth.types.ts           # Authentication types
├── component.types.ts      # React component types
├── dashboard.types.ts      # Dashboard-specific types
├── document.types.ts       # Document management types
├── form.types.ts           # Form-related types
├── store.types.ts          # State management types
└── websocket.types.ts      # WebSocket/chat types
```

## 🔧 Key Type Definitions

### Common Types (`common.types.ts`)

```typescript
// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Status and state types
export type Status = "active" | "inactive" | "pending" | "completed" | "failed";
export type LoadingState = "idle" | "loading" | "success" | "error";

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  code?: string;
}
```

### API Types (`api.types.ts`)

```typescript
// API response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: ValidationError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
  message?: string;
  success: boolean;
}

// API service types
export interface ApiService<T = any> {
  list: (params?: QueryParams) => Promise<ListResponse<T>>;
  get: (id: string | number) => Promise<SingleResponse<T>>;
  create: (data: T) => Promise<SingleResponse<T>>;
  update: (id: string | number, data: Partial<T>) => Promise<SingleResponse<T>>;
  delete: (id: string | number) => Promise<DeleteResponse>;
}
```

### Authentication Types (`auth.types.ts`)

```typescript
// User types
export interface User {
  id: UUID;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: DateString;
  updatedAt: DateString;
}

export type UserRole = "admin" | "investor" | "issuer" | "moderator";
export type UserStatus = "active" | "inactive" | "suspended" | "pending";

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message?: string;
}
```

### Component Types (`component.types.ts`)

```typescript
// Base component props
export interface BaseComponentProps {
  className?: string;
  id?: string;
  "data-testid"?: string;
}

// Button types
export interface ButtonProps extends BaseComponentProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "warning";
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

// Form field types
export interface InputProps extends BaseComponentProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // ... other props
}
```

### Dashboard Types (`dashboard.types.ts`)

```typescript
// Company types
export interface Company {
  id: UUID;
  name: string;
  logo?: string;
  industry: string;
  sector: string;
  description: string;
  website?: string;
  founded: DateString;
  employees: number;
  location: string;
  valuation: number;
  currency: Currency;
  growth: number;
  status: Status;
  tags: string[];
  createdAt: DateString;
  updatedAt: DateString;
}

// Dashboard stats types
export interface DashboardStats {
  totalCompanies: number;
  totalInvestments: number;
  averageGrowth: number;
  activeDeals: number;
  portfolioValue: number;
  totalReturns: number;
  recentActivity: ActivityItem[];
  topPerformers: Company[];
  marketTrends: MarketTrend[];
}
```

### Document Types (`document.types.ts`)

```typescript
// Document types
export interface Document {
  id: UUID;
  name: string;
  type: DocumentType;
  size: number;
  url: string;
  status: DocumentStatus;
  uploadedAt: DateString;
  uploadedBy: UUID;
  category: DocumentCategory;
  tags: string[];
  description?: string;
  version: number;
  isPublic: boolean;
  metadata: DocumentMetadata;
  permissions: DocumentPermissions;
}

export type DocumentType =
  | "PDF"
  | "DOC"
  | "DOCX"
  | "XLS"
  | "XLSX"
  | "PPT"
  | "PPTX"
  | "JPG"
  | "PNG"
  | "GIF";
export type DocumentStatus =
  | "uploaded"
  | "verified"
  | "rejected"
  | "pending"
  | "processing"
  | "failed";
export type DocumentCategory =
  | "financial"
  | "legal"
  | "marketing"
  | "technical"
  | "operational"
  | "compliance"
  | "other";
```

### WebSocket Types (`websocket.types.ts`)

```typescript
// Chat message types
export interface ChatMessage {
  id: UUID;
  conversationId: UUID;
  senderId: UUID;
  senderName: string;
  senderAvatar?: string;
  text: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: DateString;
  editedAt?: DateString;
  deletedAt?: DateString;
  metadata: MessageMetadata;
  reactions: MessageReaction[];
  attachments: MessageAttachment[];
  mentions: UUID[];
  replyTo?: UUID;
}

// Conversation types
export interface Conversation {
  id: UUID;
  name: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
  isPinned: boolean;
  createdAt: DateString;
  updatedAt: DateString;
  metadata: ConversationMetadata;
}
```

## 🎯 Usage Examples

### Using Types in Components

```typescript
import React from "react";
import { ButtonProps, InputProps } from "@/shared/types/component.types";
import { User, LoginCredentials } from "@/shared/types/auth.types";

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  user?: User;
  loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  user,
  loading,
}) => {
  const [credentials, setCredentials] = React.useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, email: e.target.value }))
        }
        placeholder="Email"
        required
      />
      <Input
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials((prev) => ({ ...prev, password: e.target.value }))
        }
        placeholder="Password"
        required
      />
      <Button type="submit" loading={loading} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};
```

### Using Types in Stores

```typescript
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  DashboardState,
  Company,
  DashboardStats,
} from "@/shared/types/dashboard.types";
import { BaseStore } from "@/shared/types/store.types";

interface DashboardStore extends DashboardState, BaseStore {
  // Additional store-specific methods
  refreshData: () => Promise<void>;
  updateCompany: (id: string, updates: Partial<Company>) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        companies: [],
        stats: {} as DashboardStats,
        aiWatchlist: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        filters: {},
        loading: false,
        error: null,

        // Actions
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),

        fetchCompanies: async (params) => {
          set({ loading: true, error: null });
          try {
            // API call implementation
            set({ loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
        },

        refreshData: async () => {
          const { fetchCompanies, fetchStats, fetchAIWatchlist } = get();
          await Promise.all([
            fetchCompanies(),
            fetchStats(),
            fetchAIWatchlist(),
          ]);
        },

        updateCompany: (id, updates) => {
          set((state) => ({
            companies: state.companies.map((company) =>
              company.id === id ? { ...company, ...updates } : company
            ),
          }));
        },
      }),
      {
        name: "dashboard-store",
        partialize: (state) => ({
          companies: state.companies,
          stats: state.stats,
          pagination: state.pagination,
          filters: state.filters,
        }),
      }
    ),
    {
      name: "dashboard-store",
    }
  )
);
```

### Using Types in API Services

```typescript
import {
  ApiService,
  ApiResponse,
  PaginatedResponse,
} from "@/shared/types/api.types";
import { Company } from "@/shared/types/dashboard.types";
import { apiClient } from "./client";

export const companiesService: ApiService<Company> = {
  list: async (params) => {
    const response = await apiClient.get<PaginatedResponse<Company>>(
      "/companies",
      { params }
    );
    return response;
  },

  get: async (id) => {
    const response = await apiClient.get<ApiResponse<Company>>(
      `/companies/${id}`
    );
    return response;
  },

  create: async (data) => {
    const response = await apiClient.post<ApiResponse<Company>>(
      "/companies",
      data
    );
    return response;
  },

  update: async (id, data) => {
    const response = await apiClient.put<ApiResponse<Company>>(
      `/companies/${id}`,
      data
    );
    return response;
  },

  delete: async (id) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/companies/${id}`
    );
    return response;
  },
};
```

## 🔍 Type Checking

### TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Type Checking Commands

```bash
# Check TypeScript types
npx tsc --noEmit

# Check types in specific files
npx tsc --noEmit src/shared/types/*.ts

# Check types with strict mode
npx tsc --noEmit --strict
```

## 🚨 Common Type Issues & Solutions

### 1. Type Mismatch Between Interfaces

**Problem**: Two interfaces have similar structures but different property types.

**Solution**: Use adapter functions or union types.

```typescript
// Example: Converting between DocumentUpload and UploadedFile
const adaptDocumentUploadToUploadedFile = (
  doc: DocumentUpload
): UploadedFile => ({
  id: doc.id,
  name: doc.name,
  size: formatFileSize(doc.size), // Convert number to string
  type: doc.type,
  progress: doc.progress,
  isUploading: doc.status === "uploading",
});
```

### 2. Generic Type Constraints

**Problem**: Generic types need specific constraints.

**Solution**: Use extends keyword to constrain generic types.

```typescript
interface ApiService<T extends { id: string | number }> {
  get: (id: T["id"]) => Promise<T>;
  update: (id: T["id"], data: Partial<T>) => Promise<T>;
  delete: (id: T["id"]) => Promise<void>;
}
```

### 3. Optional Properties

**Problem**: Properties that might not exist.

**Solution**: Use optional properties and proper type guards.

```typescript
interface User {
  id: string;
  name: string;
  email?: string; // Optional property
  avatar?: string;
}

// Type guard
const hasEmail = (user: User): user is User & { email: string } => {
  return user.email !== undefined;
};
```

### 4. Union Types

**Problem**: Multiple possible types for a value.

**Solution**: Use union types with proper type narrowing.

```typescript
type Status = "loading" | "success" | "error";

const getStatusColor = (status: Status): string => {
  switch (status) {
    case "loading":
      return "yellow";
    case "success":
      return "green";
    case "error":
      return "red";
    default:
      return "gray";
  }
};
```

## 📚 Best Practices

### 1. Type Organization

- Keep related types together in the same file
- Use descriptive names for types and interfaces
- Export types from a central location (`src/shared/types/index.ts`)

### 2. Type Safety

- Always define types for function parameters and return values
- Use strict TypeScript configuration
- Avoid using `any` type unless absolutely necessary
- Use proper type guards for runtime type checking

### 3. Component Props

- Extend base component props for consistency
- Use proper event types for event handlers
- Make props optional when appropriate
- Use union types for variant props

### 4. API Types

- Define types for all API requests and responses
- Use generic types for reusable API services
- Handle error types properly
- Use proper HTTP method types

### 5. State Management

- Define clear interfaces for store state
- Use proper action types
- Handle loading and error states
- Use proper selector types

## 🔧 Development Workflow

### 1. Adding New Types

1. Identify the appropriate type file
2. Add the new type definition
3. Export it from the main types index
4. Update any related components or services
5. Run type checking to ensure no errors

### 2. Updating Existing Types

1. Update the type definition
2. Check for breaking changes
3. Update all usages of the type
4. Run type checking
5. Update tests if necessary

### 3. Type Validation

1. Run `npx tsc --noEmit` to check types
2. Fix any type errors
3. Ensure all components are properly typed
4. Test the application to ensure runtime behavior matches types

## 🎯 Conclusion

This comprehensive type system ensures:

- **Type Safety**: All components and functions are properly typed
- **Developer Experience**: Better IntelliSense and error detection
- **Maintainability**: Clear interfaces and type definitions
- **Scalability**: Organized type structure for future development
- **Documentation**: Types serve as living documentation

The type system is designed to be flexible yet strict, providing the right balance between type safety and developer productivity.
