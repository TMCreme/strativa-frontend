import { ApiError, ApiResponse, PaginatedResponse, PaginationParams } from './common.types';

// API Client types
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, any>;
  timeout?: number;
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API Endpoint types
export interface ApiEndpoint {
  path: string;
  method: HttpMethod;
  requiresAuth?: boolean;
  timeout?: number;
}

// Query parameters - importing from common.types to avoid duplication
import { QueryParams } from './common.types';

// Request body types
export interface CreateRequest<T = any> {
  data: T;
}

export interface UpdateRequest<T = any> {
  id: string | number;
  data: Partial<T>;
}

export interface DeleteRequest {
  id: string | number;
}

// Response types
export interface ListResponse<T> extends PaginatedResponse<T> {
  data: T[];
}

export interface SingleResponse<T> extends ApiResponse<T> {
  data: T;
}

export interface DeleteResponse extends ApiResponse<null> {
  message: string;
}

// API Hook types
export interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showLoading?: boolean;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number | boolean;
  retryDelay?: number;
}

export interface UseApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  refetch: () => Promise<T | null>;
}

// API Service types
export interface ApiService<T = any> {
  list: (params?: QueryParams) => Promise<ListResponse<T>>;
  get: (id: string | number) => Promise<SingleResponse<T>>;
  create: (data: T) => Promise<SingleResponse<T>>;
  update: (id: string | number, data: Partial<T>) => Promise<SingleResponse<T>>;
  delete: (id: string | number) => Promise<DeleteResponse>;
}

// Interceptor types
export interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onRequestError?: (error: ApiError) => ApiError | Promise<ApiError>;
}

export interface ResponseInterceptor {
  onResponse?: <T>(response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;
  onResponseError?: (error: ApiError) => ApiError | Promise<ApiError>;
}

// Cache types
export interface CacheConfig {
  enabled: boolean;
  ttl: number; // Time to live in milliseconds
  key?: string;
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Rate limiting types
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  retryAfter?: number;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// WebSocket API types
export interface WebSocketConfig {
  url: string;
  protocols?: string | string[];
  options?: {
    timeout?: number;
    headers?: Record<string, string>;
    auth?: {
      token?: string;
      userId?: string;
    };
  };
}

export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp: number;
  id?: string;
}

// WebSocketEvent is defined in websocket.types.ts to avoid duplication

// File upload types
export interface FileUploadConfig {
  maxSize: number;
  allowedTypes: string[];
  multiple?: boolean;
  chunkSize?: number;
  retryAttempts?: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  speed?: number;
  estimatedTime?: number;
}

export interface FileUploadResponse {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Error handling types
export interface ErrorHandler {
  handle: (error: ApiError) => void;
  isRetryable: (error: ApiError) => boolean;
  getRetryDelay: (error: ApiError, attempt: number) => number;
}

// Authentication types
export interface AuthConfig {
  tokenKey: string;
  refreshTokenKey?: string;
  tokenExpiryKey?: string;
  autoRefresh?: boolean;
  refreshThreshold?: number;
}

// AuthTokens is imported from auth.types.ts to avoid duplication

// API Versioning
export interface ApiVersion {
  version: string;
  deprecated?: boolean;
  sunsetDate?: string;
}

// Health check types
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  services: Record<string, {
    status: 'healthy' | 'unhealthy';
    responseTime?: number;
    error?: string;
  }>;
}
