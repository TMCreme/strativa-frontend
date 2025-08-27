import { FormStep, Step } from '@/shared/components';

// Progress Stepper Configuration
export const investorSteps: Step[] = [
  {
    id: 'institutional-name',
    number: '01',
    title: 'Institutional Name',
    subtitle: 'Name of the institution'
  },
  {
    id: 'representation-kyc',
    number: '02',
    title: 'Representation KYC',
    subtitle: 'Know your customer'
  },
  {
    id: 'settlement-bank',
    number: '03',
    title: 'Settlement Bank',
    subtitle: 'Custodian'
  }
];

// Multi-Step Form Configuration
export const investorFormSteps: FormStep[] = [
  {
    id: 'institutional-details',
    title: 'Hello there! Welcome',
    subtitle: "We're glad to have you on board.",
    fields: [
      {
        id: 'institutionalName',
        label: 'Institutional Name',
        type: 'text',
        placeholder: 'e.g Acme Investments',
        required: true
      },
      {
        id: 'institutionalLicense',
        label: 'Institutional License',
        type: 'text',
        placeholder: 'Central Bank',
        required: true
      }
    ]
  },
  {
    id: 'kyc-details',
    title: 'Great job! Let\'s continue',
    subtitle: 'We\'re glad to have you on board.',
    fields: [
      {
        id: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'full name',
        required: true
      },
      {
        id: 'emailAddress',
        label: 'Email Address',
        type: 'email',
        placeholder: 'email address',
        required: true
      },
      {
        id: 'phoneNumber',
        label: 'Phone Number',
        type: 'text',
        placeholder: 'phone',
        required: true
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'password',
        required: true
      }
    ]
  },
  {
    id: 'banking-details',
    title: 'Almost there!',
    subtitle: 'We\'re glad to have you on board.',
    fields: [
      {
        id: 'bankName',
        label: 'Bank Name',
        type: 'text',
        placeholder: 'bank name',
        required: true
      },
      {
        id: 'accountNumber',
        label: 'Account Number',
        type: 'text',
        placeholder: 'account number',
        required: true
      },
      // {
      //   id: 'accountName',
      //   label: 'Account Name',
      //   type: 'text',
      //   placeholder: 'account name',
      //   required: true
      // },
      {
        id: 'swiftCode',
        label: 'SWIFT Code',
        type: 'text',
        placeholder: 'swift code',
        required: false
      },
      {
        id: 'branchCode',
        label: 'Branch Code',
        type: 'text',
        placeholder: 'branch code',
        required: false
      }
    ]
  }
];
