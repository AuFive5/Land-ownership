import { Land, User, Transaction } from '@/types';

// Mock land registry data
export const mockLands: Land[] = [
  {
    id: 'land_1',
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    location: {
      lat: -1.286389,
      lng: 36.817223,
      address: '123 Nairobi St, Nairobi, Kenya'
    },
    area: 2500,
    propertyType: 'residential',
    price: 750000,
    documents: [
      {
        id: 'doc_1',
        name: 'Property Deed',
        type: 'deed',
        url: '/documents/deed.pdf',
        uploadedAt: '2023-01-15T08:30:00Z'
      },
      {
        id: 'doc_2',
        name: 'Survey Map',
        type: 'survey',
        url: '/documents/survey.pdf',
        uploadedAt: '2023-01-16T10:15:00Z'
      }
    ],
    status: 'verified',
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-01-17T14:30:00Z'
  },
  {
    id: 'land_2',
    owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    location: {
      lat: -26.204103,
      lng: 28.047304,
      address: '456 Johannesburg Ave, Johannesburg, South Africa'
    },
    area: 1800,
    propertyType: 'residential',
    price: 550000,
    documents: [
      {
        id: 'doc_3',
        name: 'Property Deed',
        type: 'deed',
        url: '/documents/deed2.pdf',
        uploadedAt: '2023-02-10T09:45:00Z'
      }
    ],
    status: 'verified',
    createdAt: '2023-02-10T09:30:00Z',
    updatedAt: '2023-02-12T11:20:00Z'
  },
  {
    id: 'land_3',
    owner: '0x8aC7230489E80000d517Fa9E51F1d5791bD8E1B4',
    location: {
      lat: 6.524379,
      lng: 3.379206,
      address: '789 Lagos St, Lagos, Nigeria'
    },
    area: 1200,
    propertyType: 'commercial',
    price: 1200000,
    documents: [
      {
        id: 'doc_4',
        name: 'Property Deed',
        type: 'deed',
        url: '/documents/deed3.pdf',
        uploadedAt: '2023-03-05T14:20:00Z'
      },
      {
        id: 'doc_5',
        name: 'Tax Records',
        type: 'tax',
        url: '/documents/tax.pdf',
        uploadedAt: '2023-03-06T16:10:00Z'
      }
    ],
    status: 'verified',
    createdAt: '2023-03-05T14:00:00Z',
    updatedAt: '2023-03-07T10:45:00Z'
  },
  {
    id: 'land_4',
    owner: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    location: {
      lat: -33.924869,
      lng: 18.424055,
      address: '321 Cape Town St, Cape Town, South Africa'
    },
    area: 5000,
    propertyType: 'agricultural',
    price: 350000,
    documents: [
      {
        id: 'doc_6',
        name: 'Property Deed',
        type: 'deed',
        url: '/documents/deed4.pdf',
        uploadedAt: '2023-04-20T11:30:00Z'
      }
    ],
    status: 'pending',
    createdAt: '2023-04-20T11:00:00Z',
    updatedAt: '2023-04-20T11:00:00Z'
  },
  {
    id: 'land_5',
    owner: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    location: {
      lat: -1.94995,
      lng: 30.05885,
      address: '567 Kigali Dr, Kigali, Rwanda'
    },
    area: 3000,
    propertyType: 'commercial',
    price: 900000,
    documents: [
      {
        id: 'doc_7',
        name: 'Property Deed',
        type: 'deed',
        url: '/documents/deed5.pdf',
        uploadedAt: '2023-05-15T13:45:00Z'
      },
      {
        id: 'doc_8',
        name: 'Identity Verification',
        type: 'identity',
        url: '/documents/id.pdf',
        uploadedAt: '2023-05-16T09:20:00Z'
      }
    ],
    status: 'rejected',
    createdAt: '2023-05-15T13:30:00Z',
    updatedAt: '2023-05-17T15:10:00Z'
  }
];

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user_1',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user',
    createdAt: '2023-01-10T08:00:00Z'
  },
  {
    id: 'user_2',
    walletAddress: '0x8aC7230489E80000d517Fa9E51F1d5791bD8E1B4',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'user',
    createdAt: '2023-02-05T10:30:00Z'
  },
  {
    id: 'user_3',
    walletAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'user',
    createdAt: '2023-03-15T09:45:00Z'
  },
  {
    id: 'user_4',
    walletAddress: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    name: 'Diana Wilson',
    email: 'diana@example.com',
    role: 'admin',
    createdAt: '2023-01-05T14:20:00Z'
  },
  {
    id: 'user_5',
    walletAddress: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
    name: 'Edward Miller',
    email: 'edward@example.com',
    role: 'verifier',
    createdAt: '2023-02-10T11:15:00Z'
  }
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx_1',
    landId: 'land_3',
    fromAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    toAddress: '0x8aC7230489E80000d517Fa9E51F1d5791bD8E1B4',
    amount: 1200000,
    status: 'completed',
    txHash: '0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef',
    timestamp: '2023-03-10T15:30:00Z'
  },
  {
    id: 'tx_2',
    landId: 'land_5',
    fromAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    toAddress: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    amount: 900000,
    status: 'completed',
    txHash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
    timestamp: '2023-05-20T10:45:00Z'
  },
  {
    id: 'tx_3',
    landId: 'land_2',
    fromAddress: '0x8aC7230489E80000d517Fa9E51F1d5791bD8E1B4',
    toAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    amount: 550000,
    status: 'failed',
    timestamp: '2023-04-05T09:15:00Z'
  }
];