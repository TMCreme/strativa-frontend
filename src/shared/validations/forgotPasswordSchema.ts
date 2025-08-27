import { z } from 'zod';

// Step 1: Forgot Password (Email)
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
});

// Step 2: Email Verification (Verification Code)
export const emailVerificationSchema = z.object({
  verificationCode: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 characters')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
});

// Step 3: New Password
export const newPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(1, 'New password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const validateForgotPassword = (data: unknown) => {
  return forgotPasswordSchema.safeParse(data);
};

export const validateEmailVerification = (data: unknown) => {
  return emailVerificationSchema.safeParse(data);
};

export const validateNewPassword = (data: unknown) => {
  return newPasswordSchema.safeParse(data);
};
