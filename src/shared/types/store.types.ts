import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Base store types
export interface BaseStore {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// App store types
export interface AppState extends BaseStore {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    isAuthenticated: boolean;
  };
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  setUser: (user: Partial<AppState['user']>) => void;
  logout: () => void;
}

// Sidebar store types
export interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

// Dashboard store types - DashboardState is defined in dashboard.types.ts to avoid duplication

// Chat store types - ChatState is defined in websocket.types.ts to avoid duplication

// Store creation helpers
export type StoreCreator<T> = (set: any, get: any) => T;

export interface StoreConfig<T> {
  name: string;
  persist?: boolean;
  devtools?: boolean;
  partialize?: (state: T) => Partial<T>;
}

// Store middleware types
export interface StoreMiddleware {
  name: string;
  before?: (state: any, action: any) => any;
  after?: (state: any, action: any) => any;
}

// Store subscription types
export interface StoreSubscription<T> {
  selector: (state: T) => any;
  listener: (state: any, prevState: any) => void;
  equalityFn?: (a: any, b: any) => boolean;
}

// Store action types
export interface StoreAction {
  type: string;
  payload?: any;
  meta?: any;
}

// Store reducer types
export type StoreReducer<T> = (state: T, action: StoreAction) => T;

// Store enhancer types
export type StoreEnhancer<T> = (createStore: any) => (reducer: StoreReducer<T>, initialState?: T) => any;

// Store context types
export interface StoreContextType<T> {
  state: T;
  dispatch: (action: StoreAction) => void;
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
}

// Store provider types
export interface StoreProviderProps<T> {
  initialState?: T;
  reducer: StoreReducer<T>;
  enhancers?: StoreEnhancer<T>[];
  children: React.ReactNode;
}

// Zustand specific types
export interface ZustandStore<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
  destroy: () => void;
}

// Store hooks types
export interface UseStoreReturn<T> {
  state: T;
  actions: Record<string, (...args: any[]) => void>;
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

// Store selector types
export type StoreSelector<T, R> = (state: T) => R;

// Store equality function types
export type StoreEqualityFn<T> = (a: T, b: T) => boolean;

// Store middleware chain types
export type StoreMiddlewareChain = (store: any) => (next: any) => (action: any) => any;

// Store devtools types
export interface StoreDevtoolsConfig {
  name?: string;
  enabled?: boolean;
  anonymousActionsType?: string;
  serialize?: boolean | {
    options?: {
      date?: boolean;
      regex?: boolean;
      undefined?: boolean;
      nan?: boolean;
      infinity?: boolean;
      error?: boolean;
      symbol?: boolean;
      map?: boolean;
      set?: boolean;
    };
  };
  actionSanitizer?: (action: any) => any;
  stateSanitizer?: (state: any) => any;
  actionsDenylist?: string | string[];
  actionsAllowlist?: string | string[];
  predicate?: (state: any, action: any) => boolean;
  latency?: number;
  maxAge?: number;
  trace?: boolean | (() => string);
  traceLimit?: number;
  autoPause?: boolean;
  features?: {
    pause?: boolean;
    lock?: boolean;
    persist?: boolean;
    export?: boolean | 'custom';
    import?: boolean | 'custom';
    jump?: boolean;
    skip?: boolean;
    reorder?: boolean;
    dispatch?: boolean;
    test?: boolean;
  };
}

// Store persist types
export interface StorePersistConfig<T> {
  name: string;
  getStorage?: () => Storage;
  serialize?: (state: T) => string;
  deserialize?: (str: string) => T;
  partialize?: (state: T) => Partial<T>;
  version?: number;
  migrate?: (persistedState: any, version: number) => T;
  onRehydrateStorage?: (state: T) => void | ((state?: T, error?: Error) => void);
  onBeforeLift?: () => void | ((state: T) => void);
  onAfterLift?: () => void | ((state: T) => void);
  merge?: (persistedState: any, currentState: T) => T;
  blacklist?: (keyof T)[];
  whitelist?: (keyof T)[];
  timeout?: number;
  writeErrorHandler?: (error: Error) => void;
  skipHydration?: boolean;
}
