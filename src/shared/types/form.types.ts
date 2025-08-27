import { BaseComponentProps, ValidationError } from './common.types';

// Form field types
export type FormFieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'file'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'color'
  | 'range';

// Form field interface
export interface FormField {
  name: string;
  type: FormFieldType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  validation?: FieldValidation;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  cols?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  helpText?: string;
  error?: string;
}

// Select option interface
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  group?: string;
}

// Field validation interface
export interface FieldValidation {
  required?: boolean | string;
  min?: number | string;
  max?: number | string;
  minLength?: number | string;
  maxLength?: number | string;
  pattern?: RegExp | string;
  email?: boolean | string;
  url?: boolean | string;
  custom?: (value: any, formData: any) => string | undefined;
}

// Form step interface
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  validation?: FormValidation;
}

// Form validation interface
export interface FormValidation {
  fields?: Record<string, FieldValidation>;
  custom?: (data: any) => ValidationError[];
}

// Multi-step form props
export interface MultiStepFormProps extends BaseComponentProps {
  steps: FormStep[];
  currentStep: number;
  formData: Record<string, any>;
  onStepChange: (step: number) => void;
  onFormDataChange: (data: Record<string, any>) => void;
  onComplete: (data: Record<string, any>) => void;
  loading?: boolean;
  disabled?: boolean;
  showProgress?: boolean;
  allowStepNavigation?: boolean;
  validateOnStepChange?: boolean;
}

// Form hook return type
export interface UseFormReturn<T = any> {
  data: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isDirty: boolean;
  isLoading: boolean;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string) => Promise<string | undefined>;
  validateForm: () => Promise<boolean>;
  resetForm: (data?: Partial<T>) => void;
  submitForm: () => Promise<void>;
  handleSubmit: (onSubmit: (data: T) => void | Promise<void>) => (e: React.FormEvent) => void;
}

// Form validation hook return type
export interface UseFormValidationReturn {
  errors: Record<string, string>;
  validate: (data: any, schema?: any) => Record<string, string>;
  validateField: (name: string, value: any, schema?: any) => string | undefined;
  clearError: (name: string) => void;
  clearAllErrors: () => void;
  hasErrors: boolean;
  isValid: boolean;
}

// Form field props
export interface FormFieldProps extends BaseComponentProps {
  field: FormField;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Form section props
export interface FormSectionProps extends BaseComponentProps {
  title?: string;
  description?: string;
  fields: FormField[];
  data: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (name: string, value: any) => void;
  onBlur?: (name: string) => void;
  onFocus?: (name: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

// Form layout props
export interface FormLayoutProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

// Form actions props
export interface FormActionsProps extends BaseComponentProps {
  onCancel?: () => void;
  onSave?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  loading?: boolean;
  disabled?: boolean;
  showCancel?: boolean;
  showSave?: boolean;
  showNext?: boolean;
  showPrevious?: boolean;
  showComplete?: boolean;
  cancelText?: string;
  saveText?: string;
  nextText?: string;
  previousText?: string;
  completeText?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  canComplete?: boolean;
}

// Form progress props
export interface FormProgressProps extends BaseComponentProps {
  currentStep: number;
  totalSteps: number;
  steps: FormStep[];
  onStepClick?: (step: number) => void;
  allowStepNavigation?: boolean;
  showStepNumbers?: boolean;
  showStepTitles?: boolean;
  variant?: 'dots' | 'numbers' | 'tabs';
}

// Form validation schema
export interface ValidationSchema {
  [key: string]: FieldValidation;
}

// Form submission result
export interface FormSubmissionResult<T = any> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
  message?: string;
}

// Form state
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isDirty: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// Form actions
export interface FormActions<T = any> {
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setFormData: (data: Partial<T>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setFormTouched: (touched: Record<string, boolean>) => void;
  validateField: (name: string) => Promise<string | undefined>;
  validateForm: () => Promise<boolean>;
  resetForm: (data?: Partial<T>) => void;
  submitForm: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
}

// Form context
export interface FormContextType<T = any> extends FormState<T>, FormActions<T> {
  // Additional context-specific methods
}

// Form provider props
export interface FormProviderProps<T = any> {
  initialData: T;
  validationSchema?: ValidationSchema;
  onSubmit: (data: T) => void | Promise<void>;
  onValidationError?: (errors: ValidationError[]) => void;
  children: React.ReactNode;
}

// Form field renderer props
export interface FormFieldRendererProps extends FormFieldProps {
  renderField: (props: FormFieldProps) => React.ReactNode;
}

// Form field wrapper props
export interface FormFieldWrapperProps extends BaseComponentProps {
  field: FormField;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

// Form field group props
export interface FormFieldGroupProps extends BaseComponentProps {
  title?: string;
  description?: string;
  fields: FormField[];
  data: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (name: string, value: any) => void;
  onBlur?: (name: string) => void;
  onFocus?: (name: string) => void;
  disabled?: boolean;
  loading?: boolean;
  columns?: number;
  gap?: string;
}

// Form field array props
export interface FormFieldArrayProps extends BaseComponentProps {
  name: string;
  fields: FormField[];
  data: any[];
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (index: number, name: string, value: any) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
  disabled?: boolean;
  loading?: boolean;
  minItems?: number;
  maxItems?: number;
  addButtonText?: string;
  removeButtonText?: string;
}

// Form field conditional props
export interface FormFieldConditionalProps extends BaseComponentProps {
  condition: (data: Record<string, any>) => boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Form field dependency props
export interface FormFieldDependencyProps extends BaseComponentProps {
  dependencies: string[];
  children: (values: Record<string, any>) => React.ReactNode;
  fallback?: React.ReactNode;
}

// Form field validation props
export interface FormFieldValidationProps extends BaseComponentProps {
  field: FormField;
  value: any;
  formData: Record<string, any>;
  onValidation: (error: string | undefined) => void;
  children: React.ReactNode;
}

// Form field error props
export interface FormFieldErrorProps extends BaseComponentProps {
  error?: string;
  touched?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

// Form field help props
export interface FormFieldHelpProps extends BaseComponentProps {
  text?: string;
  icon?: React.ReactNode;
  variant?: 'info' | 'warning' | 'error' | 'success';
}

// Form field label props
export interface FormFieldLabelProps extends BaseComponentProps {
  label?: string;
  required?: boolean;
  htmlFor?: string;
  icon?: React.ReactNode;
  tooltip?: string;
}

// Form field input props
export interface FormFieldInputProps extends BaseComponentProps {
  field: FormField;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}
