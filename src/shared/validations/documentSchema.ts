import { z } from 'zod';

// Step 1: Regulatory Documents
export const regulatoryDocumentsSchema = z.object({
  regulatoryLicense: z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      'File must be PDF, JPEG, or PNG'
    ),
});

// Step 2: Identity Documents
export const identityDocumentsSchema = z.object({
  representativeId: z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      'File must be PDF, JPEG, or PNG'
    ),
  institutionalBankDetails: z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      'File must be PDF, JPEG, or PNG'
    ),
});

// Combined schema for all document steps
export const documentUploadSchema = z.object({
  // Step 1
  regulatoryLicense: regulatoryDocumentsSchema.shape.regulatoryLicense,
  additionalRegulatoryDoc: regulatoryDocumentsSchema.shape.regulatoryLicense,
  supportingRegulatoryDoc: regulatoryDocumentsSchema.shape.regulatoryLicense,
  
  // Step 2
  representativeId: identityDocumentsSchema.shape.representativeId,
  dragDropDocument: identityDocumentsSchema.shape.representativeId,
  institutionalBankDetails: identityDocumentsSchema.shape.institutionalBankDetails,
  finalDocument: identityDocumentsSchema.shape.institutionalBankDetails,
});

export type RegulatoryDocumentsData = z.infer<typeof regulatoryDocumentsSchema>;
export type IdentityDocumentsData = z.infer<typeof identityDocumentsSchema>;
export type DocumentUploadData = z.infer<typeof documentUploadSchema>;

export const validateRegulatoryDocuments = (data: unknown) => {
  return regulatoryDocumentsSchema.safeParse(data);
};

export const validateIdentityDocuments = (data: unknown) => {
  return identityDocumentsSchema.safeParse(data);
};

export const validateDocumentUpload = (data: unknown) => {
  return documentUploadSchema.safeParse(data);
};
