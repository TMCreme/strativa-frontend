import { DateString, UUID, Status } from './common.types';

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
  | 'PDF' 
  | 'DOC' 
  | 'DOCX' 
  | 'XLS' 
  | 'XLSX' 
  | 'PPT' 
  | 'PPTX' 
  | 'JPG' 
  | 'PNG' 
  | 'GIF' 
  | 'SVG' 
  | 'TXT' 
  | 'CSV' 
  | 'ZIP' 
  | 'RAR';

export type DocumentStatus = 'uploaded' | 'verified' | 'rejected' | 'pending' | 'processing' | 'failed';

export type DocumentCategory = 
  | 'financial' 
  | 'legal' 
  | 'marketing' 
  | 'technical' 
  | 'operational' 
  | 'compliance' 
  | 'other';

export interface DocumentMetadata {
  author?: string;
  title?: string;
  subject?: string;
  keywords?: string[];
  language?: string;
  pageCount?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  colorSpace?: string;
  compression?: string;
  encryption?: boolean;
  digitalSignature?: boolean;
  lastModified?: DateString;
  createdDate?: DateString;
}

export interface DocumentPermissions {
  canView: boolean;
  canDownload: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canShare: boolean;
  canComment: boolean;
  canApprove: boolean;
  canReject: boolean;
  sharedWith: UUID[];
  publicAccess: boolean;
}

// Document upload types
export interface DocumentUpload {
  id: UUID;
  file: File;
  name: string;
  type: DocumentType;
  size: number;
  progress: number;
  status: UploadStatus;
  error?: string;
  uploadedAt?: DateString;
  uploadedBy?: UUID;
  category?: DocumentCategory;
  tags?: string[];
  description?: string;
}

export type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed' | 'cancelled';

// UploadProgress is imported from api.types.ts to avoid duplication

// Document folder types
export interface DocumentFolder {
  id: UUID;
  name: string;
  description?: string;
  parentId?: UUID;
  path: string;
  documents: Document[];
  subfolders: DocumentFolder[];
  createdAt: DateString;
  createdBy: UUID;
  updatedAt: DateString;
  updatedBy: UUID;
  permissions: DocumentPermissions;
}

// Document version types
export interface DocumentVersion {
  id: UUID;
  documentId: UUID;
  version: number;
  name: string;
  url: string;
  size: number;
  uploadedAt: DateString;
  uploadedBy: UUID;
  changes?: string;
  isCurrent: boolean;
  metadata: DocumentMetadata;
}

// Document comment types
export interface DocumentComment {
  id: UUID;
  documentId: UUID;
  authorId: UUID;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: DateString;
  updatedAt?: DateString;
  replies: DocumentComment[];
  isResolved: boolean;
  resolvedBy?: UUID;
  resolvedAt?: DateString;
  mentions: UUID[];
}

// Document approval types
export interface DocumentApproval {
  id: UUID;
  documentId: UUID;
  approverId: UUID;
  approverName: string;
  status: ApprovalStatus;
  comments?: string;
  requestedAt: DateString;
  approvedAt?: DateString;
  rejectedAt?: DateString;
  deadline?: DateString;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired';

// Document workflow types
export interface DocumentWorkflow {
  id: UUID;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: DateString;
  createdBy: UUID;
  updatedAt: DateString;
  updatedBy: UUID;
}

export interface WorkflowStep {
  id: UUID;
  name: string;
  description?: string;
  order: number;
  type: WorkflowStepType;
  assignees: UUID[];
  deadline?: number; // in days
  isRequired: boolean;
  autoApprove?: boolean;
  conditions?: WorkflowCondition[];
}

export type WorkflowStepType = 'approval' | 'review' | 'signature' | 'notification' | 'custom';

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

// Document template types
export interface DocumentTemplate {
  id: UUID;
  name: string;
  description?: string;
  category: DocumentCategory;
  template: string;
  variables: TemplateVariable[];
  isActive: boolean;
  createdAt: DateString;
  createdBy: UUID;
  updatedAt: DateString;
  updatedBy: UUID;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: string[];
  validation?: string;
}

// Document search types
export interface DocumentSearchParams {
  query?: string;
  category?: DocumentCategory;
  status?: DocumentStatus;
  type?: DocumentType;
  uploadedBy?: UUID;
  dateRange?: {
    start: DateString;
    end: DateString;
  };
  tags?: string[];
  sizeRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'name' | 'size' | 'uploadedAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface DocumentSearchResult {
  documents: Document[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: SearchFacets;
}

export interface SearchFacets {
  categories: FacetItem[];
  types: FacetItem[];
  statuses: FacetItem[];
  tags: FacetItem[];
  uploaders: FacetItem[];
}

export interface FacetItem {
  value: string;
  count: number;
  label: string;
}

// Document sharing types
export interface DocumentShare {
  id: UUID;
  documentId: UUID;
  sharedBy: UUID;
  sharedWith: UUID;
  permissions: SharePermissions;
  expiresAt?: DateString;
  createdAt: DateString;
  accessedAt?: DateString;
  accessCount: number;
}

export interface SharePermissions {
  canView: boolean;
  canDownload: boolean;
  canEdit: boolean;
  canShare: boolean;
  canComment: boolean;
}

// Document analytics types
export interface DocumentAnalytics {
  documentId: UUID;
  views: number;
  downloads: number;
  shares: number;
  comments: number;
  averageViewTime: number;
  lastViewed?: DateString;
  lastDownloaded?: DateString;
  popularTags: string[];
  viewerDemographics: ViewerDemographics;
}

export interface ViewerDemographics {
  totalViewers: number;
  uniqueViewers: number;
  returningViewers: number;
  viewerRoles: Record<string, number>;
  viewerDepartments: Record<string, number>;
  viewerLocations: Record<string, number>;
}

// Document state types
export interface DocumentState {
  documents: Document[];
  folders: DocumentFolder[];
  uploads: DocumentUpload[];
  searchResults: DocumentSearchResult;
  selectedDocuments: UUID[];
  currentFolder?: UUID;
  loading: boolean;
  error: string | null;
  filters: DocumentFilters;
}

export interface DocumentFilters {
  category?: DocumentCategory;
  status?: DocumentStatus;
  type?: DocumentType;
  dateRange?: {
    start: DateString;
    end: DateString;
  };
  tags?: string[];
  uploadedBy?: UUID;
}

// Document actions types
export interface DocumentActions {
  uploadDocument: (file: File, metadata?: Partial<Document>) => Promise<void>;
  downloadDocument: (documentId: UUID) => Promise<void>;
  deleteDocument: (documentId: UUID) => Promise<void>;
  updateDocument: (documentId: UUID, updates: Partial<Document>) => Promise<void>;
  shareDocument: (documentId: UUID, shareData: Partial<DocumentShare>) => Promise<void>;
  searchDocuments: (params: DocumentSearchParams) => Promise<void>;
  createFolder: (folderData: Partial<DocumentFolder>) => Promise<void>;
  updateFolder: (folderId: UUID, updates: Partial<DocumentFolder>) => Promise<void>;
  deleteFolder: (folderId: UUID) => Promise<void>;
  moveDocument: (documentId: UUID, folderId: UUID) => Promise<void>;
  copyDocument: (documentId: UUID, folderId: UUID) => Promise<void>;
  approveDocument: (documentId: UUID, approvalData: Partial<DocumentApproval>) => Promise<void>;
  rejectDocument: (documentId: UUID, rejectionData: Partial<DocumentApproval>) => Promise<void>;
  addComment: (documentId: UUID, comment: Partial<DocumentComment>) => Promise<void>;
  updateComment: (commentId: UUID, updates: Partial<DocumentComment>) => Promise<void>;
  deleteComment: (commentId: UUID) => Promise<void>;
  setFilters: (filters: Partial<DocumentFilters>) => void;
  clearFilters: () => void;
  selectDocument: (documentId: UUID) => void;
  deselectDocument: (documentId: UUID) => void;
  selectAllDocuments: () => void;
  deselectAllDocuments: () => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

// Document hook types
export interface UseDocumentsReturn extends DocumentState, DocumentActions {
  // Additional document-specific methods
  getDocumentById: (id: UUID) => Document | undefined;
  getDocumentsByCategory: (category: DocumentCategory) => Document[];
  getDocumentsByStatus: (status: DocumentStatus) => Document[];
  getDocumentsByType: (type: DocumentType) => Document[];
  getDocumentsByTag: (tag: string) => Document[];
  getDocumentsByUploader: (uploaderId: UUID) => Document[];
  getDocumentVersions: (documentId: UUID) => DocumentVersion[];
  getDocumentComments: (documentId: UUID) => DocumentComment[];
  getDocumentApprovals: (documentId: UUID) => DocumentApproval[];
  getDocumentAnalytics: (documentId: UUID) => DocumentAnalytics | undefined;
  isDocumentSelected: (documentId: UUID) => boolean;
  getSelectedDocuments: () => Document[];
  getSelectedDocumentsCount: () => number;
  canPerformAction: (action: keyof DocumentPermissions, documentId: UUID) => boolean;
  getDocumentIcon: (type: DocumentType) => string;
  formatFileSize: (bytes: number) => string;
  getDocumentPreviewUrl: (documentId: UUID) => string;
}
