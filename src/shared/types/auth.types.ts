import { DateString, UUID } from './common.types';

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
  lastLoginAt?: DateString;
  preferences?: UserPreferences;
}

export type UserRole = 'admin' | 'investor' | 'issuer' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  updates: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  marketingConsent?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResendVerificationData {
  email: string;
}

// Auth response types
export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

// Session types
export interface Session {
  id: UUID;
  userId: UUID;
  token: string;
  expiresAt: DateString;
  createdAt: DateString;
  lastActivityAt: DateString;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  version: string;
}

// Two-factor authentication types
export interface TwoFactorAuth {
  enabled: boolean;
  method: 'totp' | 'sms' | 'email';
  backupCodes?: string[];
  lastUsed?: DateString;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerify {
  code: string;
  remember?: boolean;
}

// Social authentication types
export interface SocialAuthProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface SocialAuthData {
  provider: string;
  token: string;
  userData?: Partial<User>;
}

// Password strength types
export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  suggestions: string[];
  isStrong: boolean;
}

// Security types
export interface SecurityLog {
  id: UUID;
  userId: UUID;
  action: SecurityAction;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  timestamp: DateString;
  metadata?: Record<string, any>;
}

export type SecurityAction = 
  | 'login'
  | 'logout'
  | 'password_change'
  | 'password_reset'
  | 'email_verification'
  | 'two_factor_enabled'
  | 'two_factor_disabled'
  | 'account_locked'
  | 'account_unlocked'
  | 'profile_update'
  | 'session_expired';

// Permission types
export interface Permission {
  id: UUID;
  name: string;
  description: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface Role {
  id: UUID;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  createdAt: DateString;
  updatedAt: DateString;
}

// Auth state types
export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  session: Session | null;
  permissions: Permission[];
  roles: Role[];
}

// Auth actions types
export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  verifyEmail: (data: VerifyEmailData) => Promise<void>;
  resendVerification: (data: ResendVerificationData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  enableTwoFactor: () => Promise<TwoFactorSetup>;
  disableTwoFactor: (code: string) => Promise<void>;
  verifyTwoFactor: (data: TwoFactorVerify) => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Auth hook types
export interface UseAuthReturn extends AuthState, AuthActions {
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
  isInvestor: () => boolean;
  isIssuer: () => boolean;
}

// Auth guard types
export interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

// Auth context types
export interface AuthContextType extends UseAuthReturn {
  // Additional context-specific methods can be added here
  version?: string;
}

// Auth middleware types
export interface AuthMiddleware {
  requireAuth: boolean;
  requirePermissions?: string[];
  requireRoles?: string[];
  redirectTo?: string;
}

// Auth API types
export interface AuthApi {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshToken: (token: string) => Promise<RefreshTokenResponse>;
  forgotPassword: (data: ForgotPasswordData) => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  verifyEmail: (data: VerifyEmailData) => Promise<void>;
  resendVerification: (data: ResendVerificationData) => Promise<void>;
  getCurrentUser: () => Promise<User>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<UserPreferences>;
  getSessions: () => Promise<Session[]>;
  revokeSession: (sessionId: UUID) => Promise<void>;
  revokeAllSessions: () => Promise<void>;
  enableTwoFactor: () => Promise<TwoFactorSetup>;
  disableTwoFactor: (code: string) => Promise<void>;
  verifyTwoFactor: (data: TwoFactorVerify) => Promise<void>;
  getSecurityLogs: () => Promise<SecurityLog[]>;
}
