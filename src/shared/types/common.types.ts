// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'failed';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface QueryParams extends PaginationParams {
  search?: string;
  filter?: Record<string, any>;
  include?: string[];
  fields?: string[];
}

// Filter types
export interface FilterState {
  search?: string;
  status?: Status;
  dateRange?: {
    start: string;
    end: string;
  };
  [key: string]: any;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// File types
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt: string;
}

// Theme types
export type Theme = 'light' | 'dark';
export type ColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Date types
export type DateString = string; // ISO 8601 format
export type Timestamp = number; // Unix timestamp

// ID types
export type UUID = string;
export type ID = string | number;

// Currency types
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';

// Size types
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Direction types
export type Direction = 'ltr' | 'rtl';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end' | 'justify';

// Event types
export interface BaseEvent {
  id: string;
  type: string;
  timestamp: DateString;
  userId?: string;
}

// Response types
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

// Component props base types
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface BaseFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

// Modal and Toast types are defined in component.types.ts to avoid duplication

// Loading types
export interface LoadingProps extends BaseComponentProps {
  size?: Size;
  color?: ColorScheme;
  text?: string;
  fullScreen?: boolean;
}

// Empty state types
export interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}
