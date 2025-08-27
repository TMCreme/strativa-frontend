import React from 'react';
import { BaseComponentProps, BaseFormProps, Size, ColorScheme, ButtonSize, IconSize } from './common.types';
import { SelectOption } from './form.types';

// Button types
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

// Input types
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  size?: Size;
}

// Textarea types
export interface TextareaProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

// Select types - SelectOption is defined in form.types.ts to avoid duplication

export interface SelectProps extends BaseComponentProps {
  value?: string | number;
  defaultValue?: string | number;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  onChange?: (value: string | number | (string | number)[]) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  id?: string;
  size?: Size;
}

// Checkbox types
export interface CheckboxProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  indeterminate?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  value?: string;
}

// Radio types
export interface RadioProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  value?: string;
}

// Switch types
export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  onChange?: (checked: boolean) => void;
  name?: string;
  id?: string;
  size?: Size;
}

// Card types
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: Size;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

// Badge types
export interface BadgeProps extends BaseComponentProps {
  variant?: ColorScheme;
  size?: Size;
  children: React.ReactNode;
}

// Avatar types
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: Size;
  fallback?: React.ReactNode;
  status?: 'online' | 'offline' | 'away' | 'busy';
  children?: React.ReactNode;
}

// Icon types
export interface IconProps extends BaseComponentProps {
  name: string;
  size?: IconSize;
  color?: string;
  className?: string;
}

// Tooltip types
export interface TooltipProps extends BaseComponentProps {
  content: string | React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  children: React.ReactNode;
}

// Modal types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

// Drawer types
export interface DrawerProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: Size;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

// Dropdown types
export interface DropdownProps extends BaseComponentProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  disabled?: boolean;
  onSelect?: (item: DropdownItem) => void;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

// Tabs types
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps extends BaseComponentProps {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'line' | 'enclosed' | 'solid';
  size?: Size;
  fullWidth?: boolean;
}

// Accordion types
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
}

// Progress types
export interface ProgressProps extends BaseComponentProps {
  value: number;
  max?: number;
  size?: Size;
  variant?: ColorScheme;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
  label?: string;
}

// Spinner types
export interface SpinnerProps extends BaseComponentProps {
  size?: Size;
  color?: ColorScheme;
  thickness?: number;
  speed?: number;
  label?: string;
}

// Skeleton types
export interface SkeletonProps extends BaseComponentProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

// Alert types
export interface AlertProps extends BaseComponentProps {
  variant?: ColorScheme;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

// Toast types
export interface ToastProps extends BaseComponentProps {
  id: string;
  type: ColorScheme;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

// Table types
export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: keyof T | ((item: T) => any);
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, item: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  loading?: boolean;
  emptyState?: React.ReactNode;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onSelect?: (selectedItems: T[]) => void;
  onRowClick?: (item: T) => void;
}

// Pagination types
export interface PaginationProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  showTotal?: boolean;
  size?: Size;
}

// Form types
export interface FormProps extends BaseFormProps {
  children: React.ReactNode;
  method?: 'GET' | 'POST';
  action?: string;
  encType?: string;
}

// FormFieldProps is defined in form.types.ts to avoid duplication

// File upload types
export interface FileUploadProps extends BaseComponentProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  dragDrop?: boolean;
  showDragDrop?: boolean;
  children?: React.ReactNode;
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHome?: boolean;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: NavItem[];
  badge?: string | number;
}

export interface NavigationProps extends BaseComponentProps {
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (item: NavItem) => void;
  variant?: 'vertical' | 'horizontal';
  size?: Size;
}

// Sidebar types
export interface SidebarProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number;
  position?: 'left' | 'right';
  overlay?: boolean;
}

// Header types
export interface HeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

// Footer types
export interface FooterProps extends BaseComponentProps {
  children: React.ReactNode;
}

// Layout types
export interface LayoutProps extends BaseComponentProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

// Grid types
export interface GridProps extends BaseComponentProps {
  columns?: number;
  gap?: Size;
  children: React.ReactNode;
}

export interface GridItemProps extends BaseComponentProps {
  span?: number;
  children: React.ReactNode;
}

// Flex types
export interface FlexProps extends BaseComponentProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: Size;
  children: React.ReactNode;
}

// Stack types
export interface StackProps extends BaseComponentProps {
  direction?: 'row' | 'column';
  spacing?: Size;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  children: React.ReactNode;
}

// Divider types
export interface DividerProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: Size;
  color?: string;
}

// Link types
export interface LinkProps extends BaseComponentProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// Image types
export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}
