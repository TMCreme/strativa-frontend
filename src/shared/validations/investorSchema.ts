import { z } from 'zod';

// Step 1: Institutional Name
export const institutionalNameSchema = z.object({
  institutionalName: z
    .string()
    .min(1, 'Institutional name is required')
    .min(2, 'Institutional name must be at least 2 characters long')
    .max(100, 'Institutional name must be less than 100 characters')
    .trim(),
});

// Step 2: Representation KYC
export const representationKYCSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name must be less than 100 characters')
    .trim(),
  emailAddress: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

// Step 3: Settlement Bank
export const settlementBankSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .min(2, 'Bank name must be at least 2 characters long')
    .max(100, 'Bank name must be less than 100 characters')
    .trim(),
  accountNumber: z
    .string()
    .min(1, 'Account number is required')
    .regex(/^\d+$/, 'Account number must contain only numbers')
    .min(8, 'Account number must be at least 8 digits')
    .max(20, 'Account number must be less than 20 digits'),
  accountName: z
    .string()
    .min(1, 'Account name is required')
    .min(2, 'Account name must be at least 2 characters long')
    .max(100, 'Account name must be less than 100 characters')
    .trim(),
  swiftCode: z
    .string()
    .min(1, 'SWIFT code is required')
    .regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Please enter a valid SWIFT code')
    .toUpperCase()
    .trim(),
  branchCode: z
    .string()
    .min(1, 'Branch code is required')
    .regex(/^[A-Z0-9]+$/, 'Branch code must contain only letters and numbers')
    .toUpperCase()
    .trim(),
});

// Combined schema for all steps
export const investorRegistrationSchema = z.object({
  // Step 1
  institutionalName: institutionalNameSchema.shape.institutionalName,
  
  // Step 2
  fullName: representationKYCSchema.shape.fullName,
  emailAddress: representationKYCSchema.shape.emailAddress,
  phoneNumber: representationKYCSchema.shape.phoneNumber,
  password: representationKYCSchema.shape.password,
  
  // Step 3
  bankName: settlementBankSchema.shape.bankName,
  accountNumber: settlementBankSchema.shape.accountNumber,
  accountName: settlementBankSchema.shape.accountName,
  swiftCode: settlementBankSchema.shape.swiftCode,
  branchCode: settlementBankSchema.shape.branchCode,
});

export type InvestorFormData = z.infer<typeof investorRegistrationSchema>;

// Validation functions for individual steps
export const validateInstitutionalName = (data: unknown) => {
  return institutionalNameSchema.safeParse(data);
};

export const validateRepresentationKYC = (data: unknown) => {
  return representationKYCSchema.safeParse(data);
};

export const validateSettlementBank = (data: unknown) => {
  return settlementBankSchema.safeParse(data);
};

export const validateInvestorRegistration = (data: unknown) => {
  return investorRegistrationSchema.safeParse(data);
};
