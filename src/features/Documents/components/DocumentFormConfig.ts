import { Step, FormStep } from '@/shared/components';

// Progress Stepper Steps
export const documentSteps: Step[] = [
  {
    id: 'regulatory',
    number: '1',
    title: 'Regulatory Documents',
    subtitle: 'Upload your regulatory license'
  },
  {
    id: 'identity',
    number: '2',
    title: 'Identity Documents',
    subtitle: 'Upload ID and bank details'
  }
];

// Form Steps Configuration
export const documentFormSteps: FormStep[] = [
  {
    id: 'regulatory',
    title: 'Regulatory Documents',
    subtitle: 'Please upload your regulatory documents',
    fields: [
      {
        id: 'regulatoryLicense',
        type: 'file',
        label: 'Regulatory license',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      },
      {
        id: 'additionalRegulatoryDoc',
        type: 'file',
        label: 'Additional Regulatory Document',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      },
      {
        id: 'supportingRegulatoryDoc',
        type: 'file',
        label: 'Supporting Regulatory Document',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      }
    ]
  },
  {
    id: 'identity',
    title: 'Identity Documents',
    subtitle: 'Please upload your identity and bank documents',
    fields: [
      {
        id: 'representativeId',
        type: 'file',
        label: 'ID of Representative',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      },
      {
        id: 'dragDropDocument',
        type: 'file',
        label: 'Drag & Drop Document',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      },
      {
        id: 'uploadingDocument',
        type: 'file',
        label: 'Uploading Document',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      },
      {
        id: 'institutionalBankDetails',
        type: 'file',
        label: 'Institutional bank Account Details',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      },
      {
        id: 'finalDocument',
        type: 'file',
        label: 'Final Document',
        required: true,
        accept: '.pdf,.jpg,.jpeg,.png',
        maxSize: 10 // MB
      }
    ]
  }
];
